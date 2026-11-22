
/* =================================
   ACCESSBOARD - APPLICATION SCRIPT
================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* ACCESSIBLE MODAL COMPONENT */

    const modalRoot = document.getElementById("modal-root");

    if (modalRoot) {

        const componentPath = document.body.dataset.modalSrc;

        fetch(componentPath)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Unable to load modal component.");
                }

                return response.text();
            })
            .then(html => {

                modalRoot.innerHTML = html;

                const dialog = document.getElementById("user-dialog");
                const openButton = document.querySelector("[data-open-modal]");
                const closeButton = document.getElementById("close-dialog");
                const addUserForm = document.getElementById("add-user-form");

                let previousFocus = null;

                openButton.addEventListener("click", () => {

                    previousFocus = document.activeElement;

                    dialog.showModal();

                    document.getElementById("new-user-name").focus();

                });

                closeButton.addEventListener("click", () => {
                    dialog.close();
                });

                dialog.addEventListener("close", () => {

                    if (previousFocus) {
                        previousFocus.focus();
                    }

                });

                addUserForm.addEventListener("submit", event => {

                    event.preventDefault();

                    if (!addUserForm.reportValidity()) {
                        return;
                    }

                    const name = document.getElementById("new-user-name").value.trim();
                    const email = document.getElementById("new-user-email").value.trim();
                    const role = document.getElementById("new-user-role").value;

                    const table = document.querySelector("table tbody");

                    const newRow = document.createElement("tr");

                    const userId = "USR" + String(table.rows.length + 1).padStart(3, "0");

                    [userId, name, email, role, "Active"].forEach(value => {

                        const cell = document.createElement("td");

                        cell.textContent = value;

                        newRow.appendChild(cell);

                    });

                    table.appendChild(newRow);

                    document.getElementById("user-status").textContent =
                        "New user added successfully.";

                    addUserForm.reset();

                    dialog.close();

                });

            })
            .catch(error => {

                console.error(error);

                const status = document.getElementById("user-status");

                if (status) {
                    status.textContent = "The user form could not be loaded.";
                }

            });

    }

    /* SETTINGS FORM */

    const settingsForm = document.getElementById("settings-form");

    if (settingsForm) {

        settingsForm.addEventListener("submit", event => {

            event.preventDefault();

            if (!settingsForm.reportValidity()) {
                return;
            }

            document.getElementById("form-status").textContent =
                "Settings validated successfully. This demonstration does not save data permanently.";

        });

    }

});
