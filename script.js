function signIn() {
    localStorage.setItem('isRegistered', 'true');

    let oauth2Endpoint = "https://accounts.google.com/o/oauth2/v2/auth"

    let form = document.createElement('form')
    form.setAttribute('method', 'GET')
    form.setAttribute('action', oauth2Endpoint)

    let params = {
        "client_id": "355923950179-cmtb3t5umgttfb2h1bnni91qgifhqfhb.apps.googleusercontent.com",
        "redirect_uri": "http://127.0.0.1:5500/profile.html",
        "response_type": "token",
        "scope": "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/youtube.readonly",
        "include_granted_scopes": 'true',
        'state': 'pass-through-value'
    }

    for (var p in params) {
        var input = document.createElement('input')
        input.setAttribute('type', 'hidden')
        input.setAttribute('name', p)
        input.setAttribute('value', params[p])
        form.appendChild(input)
    }
    document.body.appendChild(form)
    form.submit()
}
