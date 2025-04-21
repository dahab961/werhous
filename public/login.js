document.getElementById('loginForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();
  const loginMessage = document.getElementById('loginMessage');

  try {
    const response = await fetch('/users');
    const users = await response.json();

    const match = users.find(user => user.username === username && user.password === password);

    if (match) {
      localStorage.setItem('username', username);
      window.location.href = 'warehouse.html';
    } else {
      loginMessage.innerText = '⚠️ שם משתמש או סיסמה שגויים';
    }
  } catch (error) {
    console.error('שגיאה בקבלת נתוני משתמשים:', error);
    loginMessage.innerText = '⚠️ שגיאה בשרת, נסה שוב מאוחר יותר';
  }
});
