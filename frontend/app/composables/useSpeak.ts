import { ref, onBeforeUnmount } from 'vue';

export function useSpeak() {
  const isPlaying = ref(false);
  let audio: HTMLAudioElement | null = null;

  const isSpeechSupported =
    typeof window !== 'undefined' && 'speechSynthesis' in window;

  function stop() {
    audio?.pause();
    audio = null;
    if (isSpeechSupported) window.speechSynthesis.cancel();
    isPlaying.value = false;
  }

  function speakWithBrowser(text: string) {
    if (!isSpeechSupported) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.9;
    utterance.onstart = () => (isPlaying.value = true);
    utterance.onend = () => (isPlaying.value = false);
    utterance.onerror = () => (isPlaying.value = false);
    window.speechSynthesis.speak(utterance);
  }

  async function play(text: string, audioUrl?: string | null) {
    stop();

    if (audioUrl) {
      try {
        audio = new Audio(audioUrl);
        audio.onended = () => (isPlaying.value = false);
        isPlaying.value = true;
        await audio.play();
        return;
      } catch {
        isPlaying.value = false;
      }
    }

    speakWithBrowser(text);
  }

  onBeforeUnmount(stop);

  return { play, stop, isPlaying };
}
