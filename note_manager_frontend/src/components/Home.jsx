export default function Home() {
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
  };

  const cardStyle = {
    width: '600px',
    height: '600px',
    backgroundColor: '#ffffff',
    padding: '16px',
    borderRadius: '12px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    overflowY: 'auto',
  };

  const titleStyle = {
    // fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '12px',
    color: '#333',
  };

  const textStyle = {
    fontSize: '14px',
    color: '#555',
    marginBottom: '12px',
  };

  const subtitleStyle = {
    fontSize: '16px',
    fontWeight: '600',
    marginBottom: '8px',
    color: '#444',
  };

  const listStyle = {
    paddingLeft: '20px',
    marginBottom: '12px',
  };

  const listItemStyle = {
    fontSize: '14px',
    color: '#555',
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h1 style={titleStyle}>About Note Application</h1>
        <p style={textStyle}>
          This is a simple note-taking application where users can store notes with a title and description.
          It allows you to quickly create, update, and delete notes, making it easier to manage your tasks
          and ideas effectively.
        </p>
        <h2 style={subtitleStyle}>Features:</h2>
        <ul style={listStyle}>
          <li style={listItemStyle}>Create notes with a title and description.</li>
          <li style={listItemStyle}>Edit and delete notes easily.</li>
          <li style={listItemStyle}>Organize notes to stay productive.</li>
        </ul>
        <h2 style={subtitleStyle}>Why Use This App?</h2>
        <p style={textStyle}>
          This app is designed to be fast and user-friendly, helping you to keep track of your thoughts and tasks
          without any distractions.
        </p>
      </div>
    </div>
  );
}
