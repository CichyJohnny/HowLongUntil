#  ![time_sand_clock_icon_149369](https://github.com/user-attachments/assets/01d2e9a8-f414-49b0-be53-835964cc12a7) HowLongUntil

How Long Until is simple front-end website made with HTML + CSS + JavaScript.

![demo](https://github.com/user-attachments/assets/5cba0788-02b2-45df-ba54-88a0a70bd9e1)

## Software

- VSCode 1.91.1
- WebStorm 2024.1.5

## Features

- Counting down clock
- Animationed buttons and clock transitions
- Basic elements such like header, footer
- Error Handling

Aditionally:
- Files segmentation
- Full comprehensive documentation

## Usage

- Select year - month - day and hour : minute you want to count down to
- Click button "How Long Until"
- Click top-right logo to go back

## CSS files content

1. [body](styles/body.css)
   - Website body styles
2. [buttons](styles/buttons.css)
   - Button "How Long Until" styles and animations
   - [source](https://github.com/codrops/ButtonHoverStyles/)
3. [clock elements](styles/clock_elements.css)
   - Clock with 4 columns with 5 boxes styles
   - Sliding down boxes with illusion of smooth transition animations
4. [inputs elements](styles/input_elements.css)
   - Year - month - day and hour : minute select with options styles
5. [pop-up elements](styles/popup_elements.css)
   - Alert popup style
   - Close button
6. [header](styles/header.css)
   - Header with logo styles
7. [footer](styles/footer.css)
   - Footer with description and GitHub link styles

### JS files content
1. [clock](scripts/clock.js)
   - Clock initialization
   - Time updating
   - Sliding down animation
   - End of time popup with sound
2. [date picker](scripts/datePicker.js)
   - Populating options of selects in input
   - Date validation
   - Invalid date popup
