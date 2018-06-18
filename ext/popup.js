document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('submitBtn');
    const userField = document.getElementById('userField')
    const passField = document.getElementById('passField')
    const checkbox = document.getElementById('toggle')
    const label = document.getElementById('toggle')
    
    chrome.storage.sync.get(['user','pass','toggle'], (result) => {
        let {user, pass, toggle} = result
        userField.value = user === undefined ? '' : user
        passField.value = pass === undefined ? '' : pass
        checkbox.checked = toggle === undefined ? true : toggle
    })

    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            chrome.storage.sync.set({
                toggle: true
            })
        } else {
            chrome.storage.sync.set({
                toggle: false
            })
        }
    })
    
    btn.addEventListener('click', () => {
        chrome.storage.sync.set({
            user: userField.value,
            pass: passField.value
        })

        chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
            if (tabs[0].url === 'https://insper.blackboard.com/webapps/login/') {
                var code = 'window.location.reload()'
                chrome.tabs.executeScript(tabs[0].id, {code: code});
            }
        })
  }, false)
  
})

