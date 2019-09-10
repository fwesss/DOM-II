const colors = [
  '#1493a6',
  '#1449a5',
  '#a61449',
  '#a67014',
  '#14a671',
];

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

const animateCharacterColors = (el, inColor, outColor, time, type) => {
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

  if (type === 'hover') {
    el.addEventListener('mouseover', () => {
      changeColors(outColor, inColor, time);
    });

    el.addEventListener('mouseout', () => {
      changeColors(inColor, outColor, time);
    });
  } else {
    el.addEventListener(type, () => {
      changeColors(outColor, inColor, time);
    });
  }
};

const konamiCode = (cb) => {
  let input = '';
  const key = '38384040373937396665';
  document.addEventListener('keydown', (e) => {
    input += (`${e.keyCode}`);
    if (input === key) {
      return cb();
    }
    if (!key.indexOf(input)) {
      return false;
    }
    input = (`${e.keyCode}`);
    return false;
  });
};

((() => {
  const title = document.querySelector('h1');
  const headings = document.querySelectorAll('h2, h4');

  const titleTextCharacters = title.textContent.split('');
  wrapCharacters(titleTextCharacters, title);
  animateCharacterColors(title, colors[Math.floor((Math.random() * colors.length))], '', 100, 'dblclick');
  animateCharacterColors(title, colors[Math.floor((Math.random() * colors.length))], '', 100, 'click');

  headings.forEach((heading) => {
    const headingTextCharacters = heading.textContent.split('');
    wrapCharacters(headingTextCharacters, heading);
    animateCharacterColors(heading, colors[Math.floor((Math.random() * colors.length))], '', 100, 'hover');
  });

  konamiCode(() => { alert('Secret unlocked!'); });

  const paragraphs = document.querySelectorAll('p');
  paragraphs.forEach((paragraph) => {
    paragraph.addEventListener('paste', () => {
      alert("No, really, don't paste it :(");
    });

    paragraph.addEventListener('copy', () => {
      alert("Don't steal our content please.");
    });
  });

  const images = document.querySelectorAll('img');
  images.forEach((image) => {
    image.addEventListener('auxclick', () => {
      document.querySelector('body').style.cssText = `background-color: ${colors[Math.floor((Math.random() * colors.length))]}`;
    });
  });

  window.addEventListener('resize', () => {
    document.querySelector('body').style.cssText = 'background-color: black';
    document.querySelector('*').style.color = 'gray';
  });
})());
