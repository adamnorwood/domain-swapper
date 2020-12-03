const hostsContainer = document.getElementById('hosts');
const addButton = document.createElement('button');
addButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100"><path d="M100 36.42H63.58V0H36.42v36.42H0v26.54h36.42V100h27.16V62.96H100z"/></svg> Add';
addButton.type = 'button';
addButton.classList.add('button--add');
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
    if ('' !== input.value) {
        hosts.push(input.value)
    } else {
      input.closest('div').remove();
    }
  }

  browser.storage.local.set({
    hosts: hosts
  });
}

function restoreOptions() {

  function setCurrentChoice(result) {
    if (result.hosts.length) {
      result.hosts.forEach(host => {
        hostsContainer.appendChild(hostInput(host));
      });

      hostsContainer.dataset.count = result.hosts.length;
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
  input.type = 'text';

  // Remove http:// and https:// from the input string.
  input.addEventListener('blur', (e) => {
    e.target.value = e.target.value.replace(/https?:\/\//gi, '');
  });

  const removeButton = document.createElement('button');
  removeButton.type = 'button';
  removeButton.classList.add('button--remove');
  removeButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100"><title>Remove</title><path d="M78.64 0L50 28.64 21.36 0 0 21.36 28.64 50 0 78.64l20.87 20.87 28.64-28.64L78.64 100 100 78.64 70.87 49.51l28.64-28.64z"/></svg>';
  removeButton.addEventListener('click', (e) => {
    e.target.closest('div').remove();
  });

  inputContainer.appendChild(input);
  inputContainer.appendChild(removeButton);

  return inputContainer;
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
