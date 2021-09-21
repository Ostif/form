window.addEventListener("load", (function() {
    "use strict";
    const queryForm = document.querySelector(".query__form");
    if (queryForm) {
        queryForm.addEventListener("submit", (async e => {
            e.preventDefault();
            if (!validateForm(queryForm)) {
                return;
            }
            let response = await fetch("https://60376bfd5435040017722533.mockapi.io/form", {
                method: "POST",
                body: new FormData(queryForm)
            });
            let result = await response.json();
            if (response.ok) {
                alert(result.text);
            } else {
                alert("Ошибка!");
            }
        }));
    }
    const validateForm = form => {
        const validate = form.querySelectorAll(".validate"), regular = {
            name: /^[-а-яА-ЯёЁ\s]+$/,
            phone: /^[-\+\, 0-9]+$/
        };
        let result = true;
        validate.forEach((item => {
            item.addEventListener("focus", (() => item.classList.remove("error")));
            const itemValue = item.value;
            const validation = regular[item.getAttribute("data-validation")];
            if (!itemValue || !validation.test(itemValue)) {
                item.classList.add("error");
                result = false;
            }
        }));
        return result;
    };
}));