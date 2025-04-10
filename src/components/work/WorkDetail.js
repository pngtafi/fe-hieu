import React, { useState } from 'react';
import './WorkDetail.css';

const WorkDetail = () => {
  const [items, setItems] = useState([]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const newItem = {
        id: Date.now(),
        type: 'image',
        src: event.target.result,
      };
      setItems(prev => [...prev, newItem]);
    };
    reader.readAsDataURL(file);
  };

  const handleAddText = () => {
    const newTextBlock = {
      id: Date.now(),
      type: 'text',
      lines: [
        {
          text: '',
          tag: 'p',
          bold: false,
          fontSize: 16,
        },
      ],
      isEditing: true,
    };
    setItems(prev => [...prev, newTextBlock]);
  };

  const handleLineChange = (textId, index, field, value) => {
    setItems(prev => prev.map(item => {
      if (item.id === textId) {
        const updatedLines = [...item.lines];
        updatedLines[index] = {
          ...updatedLines[index],
          [field]: value
        };
        return { ...item, lines: updatedLines };
      }
      return item;
    }));
  };

  const handleAddLine = (textId) => {
    setItems(prev => prev.map(item => {
      if (item.id === textId) {
        return {
          ...item,
          lines: [...item.lines, {
            text: '',
            tag: 'p',
            bold: false,
            fontSize: 16
          }]
        };
      }
      return item;
    }));
  };

  const handleSaveText = (textId) => {
    setItems(prev => prev.map(item => (
      item.id === textId ? { ...item, isEditing: false } : item
    )));
  };

  const handleDelete = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div className="work-detail">
      <div className="canvas">
        {items.map((item) =>
          item.type === 'image' ? (
            <div key={item.id} className="image-block">
              <img src={item.src} alt="" />
              <button className="delete-btn" onClick={() => handleDelete(item.id)}>x</button>
            </div>
          ) : (
            <div key={item.id} className="text-block-wrapper">
              {item.isEditing ? (
                <div className="text-editor">
                  {item.lines.map((line, index) => (
                    <div key={index} className="line-input">
                      <input
                        type="text"
                        value={line.text}
                        onChange={(e) =>
                          handleLineChange(item.id, index, 'text', e.target.value)
                        }
                        placeholder={`Dòng ${index + 1}`}
                      />
                      <select
                        value={line.tag}
                        onChange={(e) =>
                          handleLineChange(item.id, index, 'tag', e.target.value)
                        }
                      >
                        <option value="p">p</option>
                        <option value="div">div</option>
                        <option value="h1">h1</option>
                        <option value="h2">h2</option>
                        <option value="h3">h3</option>
                      </select>
                      <input
                        type="number"
                        min={10}
                        max={100}
                        value={line.fontSize}
                        onChange={(e) =>
                          handleLineChange(item.id, index, 'fontSize', e.target.value)
                        }
                      />
                      <label>
                        <input
                          type="checkbox"
                          checked={line.bold}
                          onChange={(e) =>
                            handleLineChange(item.id, index, 'bold', e.target.checked)
                          }
                        />
                        In đậm
                      </label>
                    </div>
                  ))}
                  <div style={{ marginTop: 8 }}>
                    <button onClick={() => handleAddLine(item.id)}>+ Thêm dòng</button>
                    <button className="save-btn" onClick={() => handleSaveText(item.id)}>Lưu</button>
                  </div>
                </div>
              ) : (
                item.type === 'text' && item.lines?.map((line, index) =>
                  React.createElement(
                    line.tag,
                    {
                      key: index,
                      style: {
                        fontSize: `${line.fontSize}px`,
                        fontWeight: line.bold ? 'bold' : 'normal'
                      }
                    },
                    line.text
                  )
                )
              )}
              <button className="delete-btn" onClick={() => handleDelete(item.id)}>x</button>
            </div>
          )
        )}
      </div>

      <div className="toolbar">
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        <button onClick={handleAddText}>Thêm Text</button>
      </div>
    </div>
  );
};

export default WorkDetail;
