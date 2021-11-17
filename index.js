// function error() {
//   // document.querySelector(".error").style.display = "inherit";
//   // document.querySelector("#errortext").innerText = `Error: ${text}`;
//   alert('Wrong password!');
// }

// Run when the <body> loads
async function main() {
    // Fail if the b64 library or API was not loaded
    window.location.replace("./#eyJ2IjoiMC4wLjEiLCJlIjoiWHRLSkNUbzh4ajE0Q2dyUEhmYmlJTVREQjVhN1Vad3E2V2hrS3E1aWlUbE1abjJNMWoxTWloNllwNzlFdUpPdE1NUVhzbXgvY05QTk96M0h4ZlpJMVl6OCtSTWxYdy9mSlFtUjJvV3lHVmkrRnlBL1QxT3NZLy9NUythbHZJNUFjVnJKTkFXUWg5ZXV5Zz09IiwiaSI6IlcvdWJkU0pENzRyOFNFdDAifQ==");

    if (!("b64" in window)) {
      error("Base64 library not loaded.");
      return;
    }
    if (!("apiVersions" in window)) {
      error("API library not loaded.");
      return;
    }

    // Try to get page data from the URL if possible
    const hash = window.location.hash.slice(1);
    let params;
    try {
      params = JSON.parse(b64.decode(hash));
    } catch {
      error("The link appears corrupted.");
      return;
    }

    // Check that all required parameters encoded in the URL are present
    if (!("v" in params && "e" in params)) {
      error("The link appears corrupted. The encoded URL is missing necessary parameters.");
      return;
    }

    // Check that the version in the parameters is valid
    if (!(params["v"] in apiVersions)) {
      error("Unsupported API version. The link may be corrupted.");
      return;
    }

    const api = apiVersions[params["v"]];

    // Get values for decryption
    const encrypted = b64.base64ToBinary(params["e"]);
    const salt = "s" in params ? b64.base64ToBinary(params["s"]) : null;
    const iv = "i" in params ? b64.base64ToBinary(params["i"]) : null;

    let hint, password;
    if ("h" in params) {
      hint = params["h"];
      password = prompt(`Password: ${hint}`);
    } else {
      password = prompt("Please enter the password or contact me.");
    }

    // Decrypt and redirect if possible
    let url;
    try {
      url = await api.decrypt(encrypted, password, salt, iv);
    } catch {
      // Password is incorrect.
      error("Password is incorrect.");

      // // Set the "decrypt without redirect" URL appropriately
      // document.querySelector("#no-redirect").href =
      //   `https://jstrieb.github.io/link-lock/decrypt/#${hash}`;

      // // Set the "create hidden bookmark" URL appropriately
      // document.querySelector("#hidden").href =
      //   `https://jstrieb.github.io/link-lock/hidden/#${hash}`;
      // return;
    }

    try {
      // Extra check to make sure the URL is valid. Probably shouldn't fail.
      let urlObj = new URL(url);

      // Prevent XSS by making sure only HTTP URLs are used. Also allow magnet
      // links for password-protected torrents.
      if (!(urlObj.protocol == "http:"
            || urlObj.protocol == "https:"
            || urlObj.protocol == "magnet:")) {
        error(`The link uses a non-hypertext protocol, which is not allowed. `
            + `The URL begins with "${urlObj.protocol}" and may be malicious.`);
        return;
      }

      // IMPORTANT NOTE: must use window.location.href instead of the (in my
      // opinion more proper) window.location.replace. If you use replace, it
      // causes Chrome to change the icon of a bookmarked link to update it to
      // the unlocked destination. This is dangerous information leakage.
      window.location.href = url;
    } catch {
      error("A corrupted URL was encrypted. Cannot redirect.");
      console.log(url);
      return;
    }
}
