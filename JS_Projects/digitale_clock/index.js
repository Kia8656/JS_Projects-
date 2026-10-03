const clockDisplay = document.getElementById("clock");
const formatButtons = document.querySelectorAll(".format-toggle button");
let hourFormat = "24";

function updateClock() {
  const now = new Date();
  const currentHour = now.getHours();
  const hours =
    hourFormat === "12"
      ? (currentHour % 12 || 12).toString().padStart(2, "0")
      : currentHour.toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, 0);
  const seconds = now.getSeconds().toString().padStart(2, 0);
  const period = currentHour < 12 ? "AM" : "PM";
  const suffix = hourFormat === "12" ? ` ${period}` : "";
  const timeString = `${hours}: ${minutes}: ${seconds}${suffix}`;
  clockDisplay.dataset.format = hourFormat;
  clockDisplay.textContent = timeString;
}

formatButtons.forEach((button) => {
  button.addEventListener("click", () => {
    hourFormat = button.dataset.format;
    formatButtons.forEach((formatButton) => {
      formatButton.setAttribute(
        "aria-pressed",
        String(formatButton === button),
      );
    });
    updateClock();
  });
});

updateClock();
setInterval(updateClock, 1000);
