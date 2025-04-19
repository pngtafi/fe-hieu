import React, { useState, useEffect } from 'react';
import { Rnd } from 'react-rnd';
import { useParams } from 'react-router-dom';
import './WorkDetail.css';

const WorkDetail = ({ user }) => {
  const { id } = useParams();  // nếu route là /work/:id
  console.log('work id:', id);
  const [items, setItems] = useState([]);

  // Hàm load dữ liệu từ backend để render lại canvas
  const loadCanvas = async () => {
    try {
      const response = await fetch(`https://be-hieu.onrender.com/api/work/${id}`);
      const result = await response.json();

      if (result.success) {
        const processedItems = result.data.map(item => {
          if (item.type === 'image') {
            return {
              ...item,
              src: item.content?.startsWith('data:') || item.content?.startsWith('http')
                ? item.content
                : `https://be-hieu.onrender.com${item.content}`,
            };
          }
          return item;
        });

        console.log('Processed items:', processedItems); // 👈 log kiểm tra
        setItems(processedItems);
      } else {
        console.error('Lỗi load dữ liệu:', result.error);
      }
    } catch (error) {
      console.error('Lỗi khi load dữ liệu:', error);
    }
  };


  useEffect(() => {
    loadCanvas();
  }, [id]);

  // Upload ảnh (dạng image item; ảnh được hiển thị ở dạng khối, không có kéo thả)
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);
    formData.append('work_id', id);

    try {
      const response = await fetch('https://be-hieu.onrender.com/api/work/upload', {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();

      if (result.success) {
        const newItem = {
          id: Date.now(),
          type: 'image',
          src: result.content,
          x: result.x,
          y: result.y,
          width: result.width,
          height: result.height,
        };
        setItems(prev => [...prev, newItem]);
      } else {
        alert('Lỗi upload ảnh!');
      }
    } catch (err) {
      console.error('Lỗi khi upload ảnh:', err);
      alert('Lỗi upload ảnh!');
    }
  };

  // Thêm text: tạo text block với thuộc tính ban đầu, nằm trong ảnh (vị trí, kích thước có thể thay đổi)
  const handleAddText = () => {
    const newTextBlock = {
      id: Date.now(),
      type: 'text',
      x: 100,
      y: 100,
      width: 300,
      height: 150,
      lines: [
        {
          text: '',
          tag: 'p',
          bold: false,
          fontSize: 16,
          color: '#000000',
        },
      ],
      isEditing: true,
    };
    setItems(prev => [...prev, newTextBlock]);
  };

  // Cập nhật nội dung hoặc thuộc tính của mỗi dòng trong text block
  const handleLineChange = (textId, index, field, value) => {
    setItems(prev =>
      prev.map(item => {
        if (item.id === textId) {
          const updatedLines = [...item.lines];
          updatedLines[index] = {
            ...updatedLines[index],
            [field]: value,
          };
          return { ...item, lines: updatedLines };
        }
        return item;
      })
    );
  };

  // Thêm một dòng mới vào text block (mặc định dòng mới là tag 'p')
  const handleAddLine = (textId) => {
    setItems(prev =>
      prev.map(item => {
        if (item.id === textId) {
          return {
            ...item,
            lines: [
              ...item.lines,
              {
                text: '',
                tag: 'p',
                bold: false,
                fontSize: 16,
                color: '#000000',
              }
            ],
          };
        }
        return item;
      })
    );
  };

  // Khi người dùng ấn nút Lưu trong text block, chuyển trạng thái isEditing thành false
  const handleSaveText = (textId) => {
    setItems(prev =>
      prev.map(item =>
        item.id === textId ? { ...item, isEditing: false } : item
      )
    );
  };

  // Xóa một item (ảnh hoặc text block)
  const handleDelete = (id) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  // Cập nhật vị trí và kích thước của text block sau khi kéo/thả hoặc resize
  const handlePositionResize = (id, data) => {
    setItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, x: data.x, y: data.y, width: data.width, height: data.height }
          : item
      )
    );
  };

  // Hàm chuyển đổi dữ liệu và lưu xuống backend MySQL thông qua API
  const handleSave = async () => {
    // Chuyển đổi items sang định dạng cần lưu:
    // Nếu item là image, lưu dưới dạng: type, content = src, các giá trị khác mặc định
    // Nếu item là text, ghép từng dòng thành HTML theo tag, style
    const convertItems = items.map(item => {
      if (item.type === 'image') {
        return {
          type: 'image',
          content: item.src,
          x: 0,
          y: 0,
          width: 0,
          height: 0,
          fontSize: null,
          color: null,
        };
      } else if (item.type === 'text') {
        const content = item.lines.map(line => {
          const tag = line.tag || 'p';
          const style = `font-size:${line.fontSize}px; color:${line.color}; font-weight:${line.bold ? 'bold' : 'normal'};`;
          return `<${tag} style="${style}">${line.text}</${tag}>`;
        }).join('\n');
        return {
          type: 'text',
          content,
          x: item.x,
          y: item.y,
          width: item.width,
          height: item.height,
          fontSize: null,
          color: null,
        };
      }
    });

    try {
      const response = await fetch(`https://be-hieu.onrender.com/api/work/${id}/save`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items: convertItems }),
      });

      const result = await response.json();
      if (result.success) {
        alert('Lưu thành công!');
        await loadCanvas();
      } else {
        alert('Lỗi khi lưu!');
        console.error(result.error);
      }
    } catch (err) {
      console.error(err);
      alert('Lỗi khi lưu dữ liệu!');
    }
  };

  return (
    <div className="work-detail">
      <div className="canvas">
        {items.map((item) =>
          item.type === 'image' ? (
            <div key={item.id} className="image-block">
              <img src={item.src} alt="" />
              {user?.role === 'admin' && (
                <button className="delete-btn" onClick={() => handleDelete(item.id)}>x</button>
              )}
            </div>
          ) : (
            user?.role === 'admin' ? (
              // Nếu là admin: Cho phép chỉnh sửa, kéo thả, resize
              <Rnd
                key={item.id}
                default={{
                  x: item.x,
                  y: item.y,
                  width: item.width,
                  height: item.height,
                }}
                bounds=".canvas"
                onDragStop={(e, d) => handlePositionResize(item.id, { ...item, x: d.x, y: d.y })}
                onResizeStop={(e, direction, ref, delta, position) => {
                  handlePositionResize(item.id, {
                    ...item,
                    width: parseInt(ref.style.width),
                    height: parseInt(ref.style.height),
                    x: position.x,
                    y: position.y,
                  });
                }}
                className="text-block"
              >
                <div className="text-block-wrapper" style={{ width: '100%', height: '100%', backgroundColor: 'transparent' }}>
                  {item.isEditing ? (
                    <div className="text-editor">
                      {item.lines.map((line, index) => (
                        <div key={index} className="line-input">
                          {/* Các input chỉnh sửa dòng */}
                          ...
                        </div>
                      ))}
                      <div className="editor-controls">
                        <button onClick={() => handleAddLine(item.id)}>+ Thêm dòng</button>
                        <button className="save-btn" onClick={() => handleSaveText(item.id)}>Lưu</button>
                      </div>
                    </div>
                  ) : (
                    <div style={{ backgroundColor: 'transparent', width: '100%', height: '100%' }}>
                      {item.lines.map((line, index) =>
                        React.createElement(
                          line.tag,
                          {
                            key: index,
                            style: {
                              fontSize: `${line.fontSize}px`,
                              fontWeight: line.bold ? 'bold' : 'normal',
                              color: line.color || '#000',
                              margin: 0,
                            },
                          },
                          line.text
                        )
                      )}
                    </div>
                  )}
                  <button className="delete-btn" onClick={() => handleDelete(item.id)}>x</button>
                </div>
              </Rnd>
            ) : (
              // Nếu không phải admin: chỉ hiển thị text không chỉnh sửa
              <div key={item.id} style={{ position: 'absolute', left: item.x, top: item.y, width: item.width, height: item.height }}>
                {item.lines.map((line, index) =>
                  React.createElement(
                    line.tag,
                    {
                      key: index,
                      style: {
                        fontSize: `${line.fontSize}px`,
                        fontWeight: line.bold ? 'bold' : 'normal',
                        color: line.color || '#000',
                        margin: 0,
                      },
                    },
                    line.text
                  )
                )}
              </div>
            )
          )
        )}
      </div>

      {/* Toolbar chỉ hiện nếu là admin */}
      {user?.role === 'admin' && (
        <div className="toolbar">
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          <button onClick={handleAddText}>Thêm Text</button>
          <button className="save-btn" onClick={handleSave}>💾 Lưu Dữ Liệu</button>
        </div>
      )}
    </div>
  );

};

export default WorkDetail;