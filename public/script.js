const username = localStorage.getItem('username') || 'אורח';
document.getElementById('usernameDisplay').textContent = username;

document.getElementById('warehouseForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const formData = new FormData();
  formData.append('itemName', document.getElementById('itemName').value);
  formData.append('barcode', document.getElementById('barcode').value);
  formData.append('quantity', document.getElementById('quantity').value);
  formData.append('operator', username);
  formData.append('timestamp', new Date().toLocaleString('he-IL'));

  fetch('https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec', {
    method: 'POST', body: formData
  }).then(res => res.text()).then(() => {
    document.getElementById('responseMessage').innerText = '✅ הנתונים נשלחו בהצלחה!';
    document.getElementById('warehouseForm').reset();
    loadHistory();
  }).catch(err => {
    document.getElementById('responseMessage').innerText = '❌ שגיאה בשליחה';
    console.error(err);
  });
});

function loadHistory() {
  fetch('https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec')
    .then(res => res.json())
    .then(data => {
      const tbody = document.querySelector('#historyTable tbody');
      tbody.innerHTML = "";
      data.reverse().forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${row.itemName}</td><td>${row.barcode}</td><td>${row.quantity}</td><td>${row.operator}</td><td>${row.timestamp}</td>`;
        tbody.appendChild(tr);
      });
    }).catch(err => console.error('שגיאה בטעינת היסטוריה:', err));
}
loadHistory();
