document.querySelector('.search-form').addEventListener('submit', function (event) {
    event.preventDefault();

    this.querySelectorAll('input').forEach((field) => {
        if (field.value === '') {
            field.remove();
        }
    });
    this.submit();
});