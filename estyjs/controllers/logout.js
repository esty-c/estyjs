
function logout() {
    this.main = main;
   
}

function main()
{
    localStorage.setItem('access_token', null);
    localStorage.clear();
    window.location.href = '/signin';
}