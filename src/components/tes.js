// PostList.jsx

const PostList = () => {

  // NEW: Auto-show full-page modal on first mount (home page load)
  useEffect(() => {
    // Option A: show every time (good for testing)
    setShowFullModal(true);

    // Option B: show only once ever (recommended)
    const hasSeen = localStorage.getItem('seenWelcomeFullModal');
    if (!hasSeen) {
      setShowFullModal(true);
      localStorage.setItem('seenWelcomeFullModal', 'true');
    }

    // Option C: show only once per browser session
    const hasSeenSession = sessionStorage.getItem('seenWelcomeSession');
    if (!hasSeenSession) {
      setShowFullModal(true);
      sessionStorage.setItem('seenWelcomeSession', 'true');
    }
  }, []);  // ← important: empty array = only on mount

  // ... rest of your PostList code (hero images, latest post, recent posts, etc.) unchanged
};