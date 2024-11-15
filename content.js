// content.js

async function addButton() {

    const targetDiv = document.querySelector("div.action-button-wrapper");
    const button = document.createElement("button");
    button.innerText = "";
    button.style.backgroundColor = "#fff100"; 
    button.style.border = "none";
    button.style.borderRadius = "5px";
    button.style.padding = "10px 15px";
    button.style.display = "flex";
    button.style.alignItems = "center";
    button.style.cursor = "pointer";
    const logo = document.createElement("img");
    logo.src = chrome.runtime.getURL("logo.png");
    logo.alt = "DuckDB Logo";
    logo.style.maxWidth = "70px";    
    logo.style.height = "auto";      
    logo.style.marginRight = "8px";  
  
    button.prepend(logo);

    button.addEventListener("click", async () => {

      const url = window.location.href;
      const regex = /\/[a-z0-9]{4}-[a-z0-9]{4}/;
      const match = url.match(regex);
      const id = match ? match[0].slice(1) : null;
      const sqlStatement = `create table tab1 as (select * from read_json_auto('https://data.sfgov.org/resource/${id}.json?$limit=9999999'));`;
  
      try {
          await navigator.clipboard.writeText(sqlStatement);
          console.log("SQL statement copied to clipboard");

          chrome.runtime.sendMessage({ action: "openDuckDBShell", sqlStatement });
        } catch (error) {
          console.error("Failed to copy to clipboard or send message:", error);
        }
    });
  
    targetDiv.appendChild(button);
  }
  
addButton();
  