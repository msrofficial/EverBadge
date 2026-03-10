import clientPromise from './db.js';

export default async function handler(req, res) {
  const { user, repo, base } = req.query;

  if (!user || !repo) {
    return res.status(400).json({ schemaVersion: 1, label: "error", message: "invalid req", color: "red" });
  }

  try {
    const headers = process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {};
    const ghResponse = await fetch(`https://api.github.com/repos/${user}/${repo}/releases`, { headers });
    
    if (!ghResponse.ok) throw new Error('API limit or repo not found');
    const releases = await ghResponse.json();
    
    let currentLiveCount = 0;
    if (Array.isArray(releases)) {
      releases.forEach(rel => {
        if (rel.assets) rel.assets.forEach(asset => currentLiveCount += asset.download_count);
      });
    }

    const client = await clientPromise;
    const db = client.db("releasedownload_tracker"); // Generic database name
    const collection = db.collection("repos");

    const repoId = `${user}/${repo}`;
    let dbData = await collection.findOne({ _id: repoId });

    let baseCount = dbData ? dbData.baseCount : 0;
    let lastLiveCount = dbData ? dbData.lastLiveCount : 0;

    const manualBase = parseInt(base) || 0;
    if (!dbData && manualBase > 0) baseCount = manualBase;

    // THE SELF-HEALING LOGIC
    if (dbData && currentLiveCount < lastLiveCount) {
        baseCount += lastLiveCount;
    }

    const totalCount = baseCount + currentLiveCount;

    await collection.updateOne(
        { _id: repoId },
        { 
            $set: { 
                username: user,
                repository: repo,
                baseCount: baseCount, 
                lastLiveCount: currentLiveCount,
                totalDownloads: totalCount,
                lastUpdated: new Date()
            } 
        },
        { upsert: true }
    );

    let displayCount = totalCount.toString();
    if (totalCount >= 1000000) displayCount = (totalCount / 1000000).toFixed(1) + 'M';
    else if (totalCount >= 1000) displayCount = (totalCount / 1000).toFixed(1) + 'k';

    res.status(200).json({
      schemaVersion: 1,
      label: "downloads",
      message: displayCount,
      color: "success",
      style: "flat-square"
    });

  } catch (error) {
    res.status(500).json({ schemaVersion: 1, label: "error", message: "server error", color: "red" });
  }
}
