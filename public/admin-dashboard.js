document.addEventListener('DOMContentLoaded', () => {
    async function fetchUserData() {
        try {
            const response = await fetch('/get-users');
            const users = await response.json();
            const tableBody = document.querySelector('#userTable tbody');
            users.forEach(user => {
                const row = document.createElement('tr');
                row.innerHTML = `<td>${user.username}</td><td>${user.password}</td>`;
                tableBody.appendChild(row);
            });
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    }

    fetchUserData();
});
