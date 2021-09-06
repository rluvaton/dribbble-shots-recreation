import anime from 'animejs';


// From his pen linked at https://github.com/juliangarnier/anime/issues/577#issuecomment-573292680
// (the comment clear when animations are paused, and how the reverse() method works, this is why we linked his comment and not his pen)
export function toggle(anim: anime.AnimeInstance, updateInternalAnimationProgress?: (value: number) => void) {
  if (anim.began) {
    // The reverse() method only changes the playback direction, and doesn't unpause a paused animation.
    anim.reverse()

    if (anim.progress === 100 && anim.direction === 'reverse') {
      // This is required so the animation won't jump to 0 and return to 100 and start closing
      // because if `internalAnimationProgress` was created by useRef at the time calling that function the value is 0 which it should be 100
      // so we update it manually
      updateInternalAnimationProgress && updateInternalAnimationProgress(100);

      anim.completed = false
    }
  }

  // Non-looped animations are automatically paused when they reach the end (or beginning when reversed).
  if (anim.paused) {

    // Doing reverse() on an animation while it is in progress means it will continue to play in the opposite direction,
    // but if the animation is at the beginning/end (i.e. paused), you will also need to do play() to get it started again.
    anim.play()
  }
}
