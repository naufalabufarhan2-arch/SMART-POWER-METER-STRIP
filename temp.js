
    // System Error Visualizer for instant debugging
    window.onerror = function (message, source, lineno, colno, error) {
      const div = document.createElement('div');
      div.style.position = 'fixed';
      div.style.top = '0';
      div.style.left = '0';
      div.style.width = '100%';
      div.style.backgroundColor = '#ef4444';
      div.style.color = '#ffffff';
      div.style.padding = '15px 25px';
      div.style.zIndex = '999999';
      div.style.fontFamily = 'monospace';
      div.style.fontSize = '12px';
      div.style.lineHeight = '1.6';
      div.style.boxShadow = '0 4px 15px rgba(0,0,0,0.4)';
      div.innerHTML = '<strong>[SYSTEM ERROR DETECTED]</strong><br>' +
        'Message: ' + message + '<br>' +
        'File: ' + source + ' (Line ' + lineno + ', Col ' + colno + ')' +
        (error && error.stack ? '<br><pre style="margin-top:8px; background:rgba(0,0,0,0.2); padding:10px; border-radius:4px; overflow-x:auto; font-size:11px;">' + error.stack + '</pre>' : '');
      document.body.appendChild(div);
      return false;
    };
  
