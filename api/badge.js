export default async function handler(req, res) {
  const { user, repo, base } = req.query;

  if (!user || !repo) {
    return res.status(400).json({ 
      schemaVersion: 1, 
      label: "downloads", 
      message: "invalid request", 
      color: "red" 
    });
  }

  const baseCount = parseInt(base) || 0;

  try {
    const response = await fetch(`https://api.github.com/repos/${user}/${repo}/releases`);
    
    if (!response.ok) {
        throw new Error('Repository not found or API rate limit exceeded');
    }

    const releases = await response.json();
    let totalLiveCount = 0;

    if (Array.isArray(releases)) {
      releases.forEach(release => {
        if (release.assets) {
          release.assets.forEach(asset => {
            totalLiveCount += asset.download_count;
          });
        }
      });
    }

    const grandTotal = baseCount + totalLiveCount;
    
    // Format numbers (e.g., 1500 -> 1.5k, 1500000 -> 1.5M)
    let displayCount = grandTotal.toString();
    if (grandTotal >= 1000000) {
        displayCount = (grandTotal / 1000000).toFixed(1) + 'M';
    } else if (grandTotal >= 1000) {
        displayCount = (grandTotal / 1000).toFixed(1) + 'k';
    }

    // Return exact JSON schema required by Shields.io Custom Endpoint
    res.status(200).json({
      schemaVersion: 1,
      label: "downloads",
      message: displayCount,
      color: "success",
      style: "flat-square"
    });

  } catch (error) {
    res.status(500).json({ 
      schemaVersion: 1, 
      label: "downloads", 
      message: "error", 
      color: "red" 
    });
  }
}
