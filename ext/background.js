chrome.tabs.onUpdated.addListener((id, changeInfo, tab) => {
    if (tab.url === "https://insper.blackboard.com/webapps/login/") {
        chrome.storage.sync.get(['user','pass','toggle'], (result) => {
            let {user, pass, toggle} = result
            if (toggle === undefined || toggle === true) {
                if (user !== undefined && pass !== undefined && user !== '' && pass !== '') {
                    chrome.tabs.executeScript(id, {
                        code: (
                            `const userForm = document.getElementById('user_id')
                            const passForm = document.getElementById('password')
                            const loginBtn = document.getElementById('entry-login')
                            userForm.value = '${user}'
                            passForm.value = '${pass}'
                            loginBtn.click()
                            `
                        )
                    })      
                }

            }
        })
    }
})
