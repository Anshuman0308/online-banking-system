// API endpoints
const API_URL = '/api/accounts';

// Show message function
function showMessage(message, isError = false) {
    const messageElement = document.getElementById('message');
    messageElement.textContent = message;
    messageElement.className = 'message ' + (isError ? 'error' : 'success');
    setTimeout(() => {
        messageElement.className = 'message';
    }, 5000);
}

// Create a new account
function createAccount() {
    const accountName = document.getElementById('accountName').value.trim();
    
    if (!accountName) {
        showMessage('Please enter account holder name', true);
        return;
    }
    
    fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            accountHolderName: accountName
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to create account');
        }
        return response.json();
    })
    .then(data => {
        showMessage(`Account created successfully! Account ID: ${data.id}`);
        document.getElementById('accountName').value = '';
    })
    .catch(error => {
        showMessage(error.message, true);
    });
}

// Get account details
function getAccount() {
    const accountId = document.getElementById('accountId').value;
    
    if (!accountId) {
        showMessage('Please enter account ID', true);
        return;
    }
    
    fetch(`${API_URL}/${accountId}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Account not found');
        }
        return response.json();
    })
    .then(data => {
        document.getElementById('holderName').textContent = data.accountHolderName;
        document.getElementById('balance').textContent = data.balance;
        document.getElementById('accountDetails').style.display = 'block';
    })
    .catch(error => {
        showMessage(error.message, true);
    });
}

// Deposit money
function deposit() {
    const accountId = document.getElementById('accountId').value;
    const amount = document.getElementById('amount').value;
    
    if (!accountId || !amount || parseFloat(amount) <= 0) {
        showMessage('Please enter valid account ID and amount', true);
        return;
    }
    
    fetch(`${API_URL}/${accountId}/deposit`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            amount: amount
        })
    })
    .then(response => {
        if (!response.ok) {
            return response.text().then(text => { throw new Error(text) });
        }
        return response.json();
    })
    .then(data => {
        document.getElementById('balance').textContent = data.balance;
        showMessage(`Successfully deposited $${amount}`);
        document.getElementById('amount').value = '';
    })
    .catch(error => {
        showMessage(error.message, true);
    });
}

// Withdraw money
function withdraw() {
    const accountId = document.getElementById('accountId').value;
    const amount = document.getElementById('amount').value;
    
    if (!accountId || !amount || parseFloat(amount) <= 0) {
        showMessage('Please enter valid account ID and amount', true);
        return;
    }
    
    fetch(`${API_URL}/${accountId}/withdraw`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            amount: amount
        })
    })
    .then(response => {
        if (!response.ok) {
            return response.text().then(text => { throw new Error(text) });
        }
        return response.json();
    })
    .then(data => {
        document.getElementById('balance').textContent = data.balance;
        showMessage(`Successfully withdrew $${amount}`);
        document.getElementById('amount').value = '';
    })
    .catch(error => {
        showMessage(error.message, true);
    });
}

// Search accounts by name
function searchAccounts() {
    const searchName = document.getElementById('searchName').value.trim();
    
    if (!searchName) {
        showMessage('Please enter a name to search', true);
        return;
    }
    
    fetch(`${API_URL}/search?name=${encodeURIComponent(searchName)}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Search failed');
        }
        return response.json();
    })
    .then(accounts => {
        const tableBody = document.getElementById('accountsTableBody');
        tableBody.innerHTML = '';
        
        if (accounts.length === 0) {
            showMessage('No accounts found with that name');
            document.getElementById('searchResults').style.display = 'none';
            return;
        }
        
        accounts.forEach(account => {
            const row = document.createElement('tr');
            
            const idCell = document.createElement('td');
            idCell.textContent = account.id;
            row.appendChild(idCell);
            
            const nameCell = document.createElement('td');
            nameCell.textContent = account.accountHolderName;
            row.appendChild(nameCell);
            
            const balanceCell = document.createElement('td');
            balanceCell.textContent = `$${account.balance}`;
            row.appendChild(balanceCell);
            
            const actionCell = document.createElement('td');
            const viewButton = document.createElement('button');
            viewButton.textContent = 'View';
            viewButton.className = 'view-btn';
            viewButton.onclick = function() {
                document.getElementById('accountId').value = account.id;
                getAccount();
            };
            actionCell.appendChild(viewButton);
            row.appendChild(actionCell);
            
            tableBody.appendChild(row);
        });
        
        document.getElementById('searchResults').style.display = 'block';
    })
    .catch(error => {
        showMessage(error.message, true);
    });
}

// Delete account
function deleteAccount() {
    const accountId = document.getElementById('accountId').value;
    
    if (!accountId) {
        showMessage('Please enter account ID', true);
        return;
    }
    
    if (!confirm('Are you sure you want to delete this account? This action cannot be undone.')) {
        return;
    }
    
    fetch(`${API_URL}/${accountId}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to delete account');
        }
        document.getElementById('accountDetails').style.display = 'none';
        showMessage(`Account ${accountId} has been deleted successfully`);
        document.getElementById('accountId').value = '';
    })
    .catch(error => {
        showMessage(error.message, true);
    });
}