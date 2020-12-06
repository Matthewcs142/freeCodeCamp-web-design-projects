// Get UI elements
const progress = document.querySelector('#progress'),
      prev = document.querySelector('#prev'),
      next = document.querySelector('#next'),
      circles = document.querySelectorAll('.circle');

// Count variable - used as a flag to control the progress bar
let currentActive = 1;

// Event listeners
// Next button
next.addEventListener('click', () => {
    // Increment count variable
    currentActive ++;

    // Check if value of count variable exceedes the number of nodes in the progress bar
    if(currentActive > circles.length) {
        currentActive = circles.length;
    }

    // Update progress bar
    update();
 })

 // Previous button
 prev.addEventListener('click', () => {
    // Decrement count variable 
    currentActive --;

    // Check if value of count variable has dropped below the minimum number of nodes in the progress bar
    if(currentActive < 1) {
        currentActive = 1;
    }

    // Update progress bar
    update();
 })

// Functions
function update() {
    circles.forEach((circle, index) => {
        if(index < currentActive) {
            circle.classList.add('active');
        } else {
            circle.classList.remove('active');
        }
    })

    // Get all active classes from the UI
    const actives = document.querySelectorAll('.active');

    // Update progress bar
    progress.style.width = (actives.length - 1) / (circles.length - 1) * 100 + '%';

    // Update button functionality
    if (currentActive === 1) {
        prev.disabled = true;
    } else if (currentActive === circles.length) {
        next.disabled = true;
    } else {
        prev.disabled = false;
        next.disabled = false;
    }
}
