export default function ChatMenu() {
  const userString = localStorage.getItem('user')
  const user = userString ? JSON.parse(userString) : null
  
  return (
    <>
      <h1>hi {user?.userName}</h1>
      <h1>This should be the main page where you see all the chats.</h1>
    </>
  );
}
