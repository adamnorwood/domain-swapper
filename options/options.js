const hostsContainer = document.getElementById('hosts');

const addButton = document.createElement('button');
addButton.innerHTML = 'Add host';
addButton.type = 'button';
addButton.addEventListener('click', (e) => {
  e.preventDefault();
  hostsContainer.appendChild(hostInput());
});
hostsContainer.appendChild(addButton);

function saveOptions(e) {

  e.preventDefault();

  let hosts = [];
  const inputs = document.querySelectorAll('input');
  for (const input of inputs) {
    hosts.push(input.value)
  }

  browser.storage.local.set({
    hosts: hosts
  });
}

function restoreOptions() {

  function setCurrentChoice(result) {
    if (result.hosts) {
      result.hosts.forEach(host => {
        hostsContainer.appendChild(hostInput(host));
      });
    }
  }

  let getting = browser.storage.local.get("hosts");
  getting.then(setCurrentChoice, (error) => {
    console.log(`Error: ${error}`);
  });
}

function hostInput(value) {
  const inputContainer = document.createElement('div');
  const input = document.createElement('input');
  input.value = value || '';

  const removeButton = document.createElement('button');
  removeButton.type = 'button';
  removeButton.innerText = 'Remove';
  removeButton.addEventListener('click', (e) => {
    e.target.parentNode.remove();
  });

  inputContainer.appendChild(input);
  inputContainer.appendChild(removeButton);

  return inputContainer;
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
