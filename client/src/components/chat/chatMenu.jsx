export default function ChatMenu() {
  const userString = localStorage.getItem('user')
  const user = userString ? JSON.parse(userString) : null
  
  return (
    <>
      <h1>hi {user?.userName}</h1>
      <h1>כאן אמור להיות הדף הראשי שרואים את כל הצאטים</h1>
    </>
  );
}
