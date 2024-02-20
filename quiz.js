document.addEventListener("DOMContentLoaded", function () {
  var tags = document.querySelectorAll(".tag");
  var boxes = document.querySelectorAll(".box");

  // Hide all boxes by default
  boxes.forEach(function (box) {
    box.style.display = "none";
  });

  tags.forEach(function (tag) {
    tag.addEventListener("click", function () {
      var target = this.getAttribute("data-target");

      // Reset all tags to original color
      tags.forEach(function (tag) {
        tag.classList.remove("active");
      });

      // Hide all boxes
      boxes.forEach(function (box) {
        box.style.display = "none";
      });

      // Show boxes with the corresponding data-source attribute
      var targetBoxes = document.querySelectorAll('.box[data-source="' + target + '"]');
      targetBoxes.forEach(function (box) {
        box.style.display = "block";
      });

      // Highlight the clicked tag
      this.classList.add("active");
    });
  });

  boxes.forEach(function (box) {
    box.addEventListener("click", function (event) {
      if (event.target.classList.contains("box_head")) {
        this.classList.toggle("active");
      }
    });
  });
});
