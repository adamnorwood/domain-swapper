const hostsContainer = document.getElementById('hosts');

function saveOptions(e) {

  let hosts = [];
  const inputs = document.querySelectorAll('input');
  for (const input of inputs) {
    hosts.push(input.value)
  }

  e.preventDefault();
  browser.storage.local.set({
    hosts: hosts
  });
}

function restoreOptions() {

  function setCurrentChoice(result) {
    result.hosts.forEach(host => {
      let input = document.createElement('input');
      input.value = host;
      hostsContainer.appendChild(input);
    });
  }

  let getting = browser.storage.local.get("hosts");
  getting.then(setCurrentChoice, (error) => {
    console.log(`Error: ${error}`);
  });
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
