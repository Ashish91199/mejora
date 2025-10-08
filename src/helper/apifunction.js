const url = "http://localhost:8001/api/";

export function signup_user(ref, user) {
  // Make sure to use the correct endpoint from your local server
  return fetch(`${url}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ sponser_id: ref, user }),
  }).then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  });
}


export function getProfile(id) {
  // Make sure to use the correct endpoint from your local server
  return fetch(`${url}/profile`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: id }),
  }).then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  });
}

export function getLevel(id, idd) {
  // Make sure to use the correct endpoint from your local server
  return fetch(`${url}/get-downline`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: id, level_id: idd }),
  }).then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  });
}

export function getMatrix(id) {
  // Make sure to use the correct endpoint from your local server
  return fetch(`${url}/get-matrix-downline`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: id }),
  }).then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  });
}

export function getdepositAddress(id, network, amount, order_id) {
  // Make sure to use the correct endpoint from your local server
  return fetch(`${url}/get-deposit`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: id, network: network, amount: amount, order_id: order_id }),
  }).then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  });
}
export function getWithdraw(id, network, amount, wallet_address) {
  // Make sure to use the correct endpoint from your local server
  return fetch(`${url}/get-withdraw`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: id, network: network, amount: amount, wallet_address: wallet_address }),
  }).then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  });
}

export function getUserLevel(id, level) {
  // Make sure to use the correct endpoint from your local server
  return fetch(`${url}/get-user-level`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: id, level: level }),
  }).then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  });
}

export function activateMatrix(id, type) {
  // Make sure to use the correct endpoint from your local server
  return fetch(`${url}/activate-matrix`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: id, type: type }),
  }).then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  });
}

export function activateLevelAPI(id, level) {
  // Make sure to use the correct endpoint from your local server
  return fetch(`${url}/activate-level`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: id, level: level }),
  }).then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  });
}

export function getRank(id) {
  // Make sure to use the correct endpoint from your local server
  return fetch(`${url}/get-rank`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: id }),
  }).then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  });
}


