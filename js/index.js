const wrapCharacters = (str, parent) => {
  parent.textContent = '';
  for (let i = 0; i < str.length; i += 1) {
    const span = document.createElement('span');
    span.textContent = str[i];
    parent.append(span);
  }
};

const setElementColor = (el, startColor, endColor, time) => {
  el.style.transition = `color ${time}ms`;
  el.style.color = endColor;
};

((() => {
  const title = document.querySelector('.logo-heading');
  const titleText = title.textContent;
  const titleTextCharacters = titleText.split('');

  // Replace text content with series of spans for each character of original text
  wrapCharacters(titleTextCharacters, title);

  const animateCharacterColors = (el, inColor, outColor, time) => {
    const changeColors = (startColor, endColor) => {
      let child = 0;
      const interval = setInterval(() => {
        if (child < el.childNodes.length) {
          setElementColor(el.childNodes[child], startColor, endColor, time);
          child += 1;
        } else {
          clearInterval(interval);
        }
      }, time);
    };

    el.addEventListener('mouseover', () => {
      changeColors(outColor, inColor, time);
    });

    el.addEventListener('mouseout', () => {
      changeColors(inColor, outColor, time);
    });
  };

  animateCharacterColors(title, '#17a2b8', '', 100);
})());
