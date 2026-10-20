/**
 * 联系表单：前端校验，并明确说明预览不会把内容发到服务器。
 */
(function () {
  /**
   * 校验联系表单字段。
   * @param {{name: string, email: string, topic: string, message: string}} data
   * @returns {Object<string, string>}
   */
  function validate(data) {
    /** @type {Object<string, string>} */
    const errors = {};
    if (data.name.trim().length < 2) errors.name = "Add your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) errors.email = "Enter a full email address.";
    if (!data.topic) errors.topic = "Choose a topic.";
    if (data.message.trim().length < 20) errors.message = "Write at least a sentence or two (20 characters).";
    return errors;
  }

  /**
   * 把错误写到对应字段。
   * @param {Object<string, string>} errors
   * @returns {void}
   */
  function paintErrors(errors) {
    ["name", "email", "topic", "message"].forEach((key) => {
      const field = document.getElementById(key);
      const slot = document.querySelector(`[data-error-for="${key}"]`);
      const message = errors[key] || "";
      field.setAttribute("aria-invalid", message ? "true" : "false");
      slot.textContent = message;
    });
    const banner = document.getElementById("form-banner");
    const hasError = Object.keys(errors).length > 0;
    banner.hidden = !hasError;
    banner.textContent = hasError ? "Check the highlighted fields." : "";
  }

  /**
   * 绑定提交与重置。
   * @returns {void}
   */
  function init() {
    const form = document.getElementById("contact-form");
    const success = document.getElementById("form-success");
    if (!form || !success) return;

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        topic: document.getElementById("topic").value,
        message: document.getElementById("message").value
      };
      const errors = validate(data);
      paintErrors(errors);
      if (Object.keys(errors).length) return;
      form.hidden = true;
      success.hidden = false;
      success.querySelector("[data-name]").textContent = data.name.trim();
      success.focus();
    });

    document.getElementById("again").addEventListener("click", () => {
      form.reset();
      paintErrors({});
      form.hidden = false;
      success.hidden = true;
      document.getElementById("name").focus();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
