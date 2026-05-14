async function checkLogin() {
    try {
        const response = await fetch('/api/auth/check', {
            credentials: 'include'
        });
        const data = await response.json();

        if (!response.ok || data.roleId !== 3) {
            alert("Akses Ditolak! Anda harus login sebagai Wakil Dekan 2.");
            window.location.href = '/login.html';
        }
    } catch (error) {
        window.location.href = '/login.html';
    }
}

checkLogin();

document.getElementById('logoutBtn').addEventListener('click', async function() {
    try {
        await fetch('/api/auth/logout', { 
            method: 'POST',
            credentials: 'include'
        });
        window.location.href = '/login.html';
    } catch (error) {
        console.error("Gagal logout");
    }
});