document.addEventListener('DOMContentLoaded', function () {
    // 监听表单提交
    document.getElementById('contactForm').addEventListener('submit', function (event) {
        event.preventDefault();

        const contactId = document.getElementById('contactId').value; // 获取 ID
        const contact = {
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
            email: document.getElementById('email').value
        };

        const method = contactId ? 'PUT' : 'POST'; // 判断是更新还是添加
        const url = contactId ? `http://8.136.126.246:8080/contacts/${contactId}` : 'http://8.136.126.246:8080/contacts';

        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contact)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                loadContacts(); // 重新加载联系人列表
                // 清空输入框
                document.getElementById('contactForm').reset();
                document.getElementById('contactId').value = ''; // 清空 ID
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    });

    // 获取联系人列表
    loadContacts();

    function loadContacts() {
        fetch('http://8.136.126.246:8080/contacts')
            .then(response => response.json())
            .then(data => {
                const contactList = document.getElementById('contactList');
                contactList.innerHTML = ''; // 清空列表
                data.forEach(contact => {
                    const contactItem = document.createElement('div');
                    contactItem.textContent = `${contact.name} - ${contact.phone} - ${contact.email}`;

                    // 添加编辑按钮
                    const editButton = document.createElement('button');
                    editButton.textContent = '编辑';
                    editButton.classList.add('edit-button'); // 添加编辑按钮的类
                    editButton.onclick = () => editContact(contact);
                    contactItem.appendChild(editButton);

                    // 添加删除按钮
                    const deleteButton = document.createElement('button');
                    deleteButton.textContent = '删除';
                    deleteButton.classList.add('delete-button'); // 添加删除按钮的类
                    deleteButton.onclick = () => deleteContact(contact.id);
                    contactItem.appendChild(deleteButton);

                    contactList.appendChild(contactItem);
                });
            })
            .catch(error => {
                console.error('There was a problem fetching contacts:', error);
            });
    }

    // 编辑联系人
    function editContact(contact) {
        document.getElementById('contactId').value = contact.id; // 设置联系人 ID
        document.getElementById('name').value = contact.name;
        document.getElementById('phone').value = contact.phone;
        document.getElementById('email').value = contact.email;
    }

    // 删除联系人
    function deleteContact(id) {
        fetch(`http://8.136.126.246:8080/contacts/${id}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                loadContacts(); // 重新加载联系人列表
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }
});
