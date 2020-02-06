# cyber-effect

## Cyber

Anything marked with class `.cybertext` will change color (black toward white) in response to an associated audio track's spectrogram.

The color of the text is reflective of the average of the frequency response at the moment (every 1/100th of a second in this example).

## Advanced

In this case, the inner text in the specified element is treated as the spectrum of the sound; that is, the first character represents the lowest frequencies, and the last character represents the highest.  The text is split into individual `<span>`s whose `color` style is set to a dynamically generated CSS var like `--ca-0-9`.  The lambda invoked by `setInterval()` then updates the CSS vars according to the frequency response spectrum at that moment in time.

## The color spectrum

The colors stretch across the following colors:

* 128,0,0 -- dark red
* 255,0,0 -- red
* 255,168,0 -- orange
* 255,255,0 -- yellow
* 255,255,255 -- white

By adjusting the `red_pts`, `green_pts`, and `blue_pts` arrays, you can shift how much each color is in the spectrum.  The `build_colors( max )` function stretches those colors out across the `red`, `green`, and `blue` arrays from `0` to `max`.  You should probably leave `max=255`.
