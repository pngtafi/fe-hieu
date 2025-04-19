import React, { useState, useEffect } from 'react';
import { Rnd } from 'react-rnd';
import { useParams } from 'react-router-dom';
import './WorkDetail.css';

/**
 * WorkDetail – canvas editor for images & rich‑text blocks
 * Fixes:
 *  1. Always initialise items/lines as arrays to avoid `undefined.map`.
 *  2. Add defensive checks when rendering with `item.lines?.map`.
 *  3. When fetching data, guarantee each text‑item has `lines` + `isEditing`.
 *  4. Persist `lines` when saving so the format round‑trips.
 */
const WorkDetail = ({ user }) => {
  const { id } = useParams();
  const [items, setItems] = useState([]);

  /* ----------------------------- Helpers ----------------------------- */
  const API = 'https://be-hieu.onrender.com';

  /**
   * Convert server payload → canvas items with safe defaults.
   */
  const normaliseItems = (raw = []) =>
    raw.map((item) => {
      if (item.type === 'image') {
        return {
          ...item,
          // Chèn src tuyệt đối nếu cần.
          src:
            item.content?.startsWith('data:') || item.content?.startsWith('http')
              ? item.content
              : `${API}${item.content}`,
        };
      }

      // Text‑item: đảm bảo có lines & isEditing flag.
      if (item.type === 'text') {
        let lines = [];

        // Nếu backend đã trả về lines hợp lệ ⇒ dùng luôn.
        if (Array.isArray(item.lines) && item.lines.length) {
          lines = item.lines;
        } else {
          // Ngược lại, parse content HTML sơ bộ thành 1 dòng <p>.
          const plain = (item.content || '').replace(/<[^>]*>/g, '');
          lines = [
            {
              text: plain,
              tag: 'p',
              bold: false,
              fontSize: 16,
              color: '#000000',
            },
          ];
        }

        return {
          ...item,
          lines,
          isEditing: false,
        };
      }

      return item; // fallback
    });

  /* ------------------------------ Effects ---------------------------- */
  const loadCanvas = async () => {
    try {
      const res = await fetch(`${API}/api/work/${id}`);
      const json = await res.json();
      if (json.success) {
        setItems(normaliseItems(json.data));
      } else {
        console.error('Lỗi load dữ liệu:', json.error);
      }
    } catch (e) {
      console.error('Lỗi khi load dữ liệu:', e);
    }
  };

  useEffect(() => {
    loadCanvas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  /* --------------------------- Image upload -------------------------- */
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);
    formData.append('work_id', id);

    try {
      const res = await fetch(`${API}/api/work/upload`, { method: 'POST', body: formData });
      const json = await res.json();
      if (json.success) {
        const newItem = {
          id: Date.now(),
          type: 'image',
          src: json.content,
          x: json.x,
          y: json.y,
          width: json.width,
          height: json.height,
        };
        setItems((prev) => [...prev, newItem]);
      } else {
        alert('Lỗi upload ảnh!');
      }
    } catch (err) {
      console.error(err);
      alert('Lỗi upload ảnh!');
    }
  };

  /* ------------------------------ Text ops --------------------------- */
  const handleAddText = () => {
    const newText = {
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
    setItems((prev) => [...prev, newText]);
  };

  const handleLineChange = (textId, index, field, value) =>
    setItems((prev) =>
      prev.map((it) => {
        if (it.id !== textId) return it;
        const lines = [...it.lines];
        lines[index] = { ...lines[index], [field]: value };
        return { ...it, lines };
      })
    );

  const handleAddLine = (textId) =>
    setItems((prev) =>
      prev.map((it) =>
        it.id === textId
          ? {
            ...it,
            lines: [
              ...it.lines,
              { text: '', tag: 'p', bold: false, fontSize: 16, color: '#000000' },
            ],
          }
          : it
      )
    );

  const handleSaveText = (textId) =>
    setItems((prev) => prev.map((it) => (it.id === textId ? { ...it, isEditing: false } : it)));

  /* -------------------------- Pos / size ops ------------------------- */
  const handleDelete = (targetId) => setItems((prev) => prev.filter((it) => it.id !== targetId));

  const handlePositionResize = (targetId, data) =>
    setItems((prev) =>
      prev.map((it) => (it.id === targetId ? { ...it, ...data } : it))
    );

  /* ----------------------------- Persist ----------------------------- */
  const handleSave = async () => {
    const payload = items.map((it) => {
      if (it.type === 'image') {
        return { type: 'image', content: it.src, x: 0, y: 0, width: 0, height: 0 };
      }
      if (it.type === 'text') {
        const html = it.lines
          .map((l) => {
            const style = `font-size:${l.fontSize}px;color:${l.color};font-weight:${l.bold ? 'bold' : 'normal'};`;
            return `<${l.tag} style="${style}">${l.text}</${l.tag}>`;
          })
          .join('\n');
        return {
          type: 'text',
          content: html,
          lines: it.lines, // giữ lines để lần sau khỏi parse lại
          x: it.x,
          y: it.y,
          width: it.width,
          height: it.height,
        };
      }
      return it;
    });

    try {
      const res = await fetch(`${API}/api/work/${id}/save`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: payload }),
      });
      const json = await res.json();
      if (json.success) {
        alert('Lưu thành công!');
        loadCanvas();
      } else {
        alert('Lỗi khi lưu!');
        console.error(json.error);
      }
    } catch (err) {
      console.error(err);
      alert('Lỗi khi lưu dữ liệu!');
    }
  };

  /* ------------------------------ Render ----------------------------- */
  return (
    <div className="work-detail">
      <div className="canvas">
        {items.map((item) =>
          item.type === 'image' ? (
            <div key={item.id} className="image-block">
              <img src={item.src} alt="" />
              {user?.role === 'admin' && (
                <button className="delete-btn" onClick={() => handleDelete(item.id)}>
                  x
                </button>
              )}
            </div>
          ) : user?.role === 'admin' ? (
            <Rnd
              key={item.id}
              default={{ x: item.x, y: item.y, width: item.width, height: item.height }}
              bounds=".canvas"
              onDragStop={(e, d) => handlePositionResize(item.id, { x: d.x, y: d.y })}
              onResizeStop={(e, dir, ref, delta, pos) =>
                handlePositionResize(item.id, {
                  width: parseInt(ref.style.width, 10),
                  height: parseInt(ref.style.height, 10),
                  x: pos.x,
                  y: pos.y,
                })
              }
              className="text-block"
            >
              <div className="text-block-wrapper" style={{ width: '100%', height: '100%', backgroundColor: 'transparent' }}>
                {item.isEditing ? (
                  <div className="text-editor">
                    {item.lines?.map?.((line, index) => (
                      <div key={index} className="line-input">
                        {/* Your inputs here */}
                      </div>
                    ))}
                    <div className="editor-controls">
                      <button onClick={() => handleAddLine(item.id)}>+ Thêm dòng</button>
                      <button className="save-btn" onClick={() => handleSaveText(item.id)}>
                        Lưu
                      </button>
                    </div>
                  </div>
                ) : (
                  <div style={{ backgroundColor: 'transparent', width: '100%', height: '100%' }}>
                    {item.lines?.map?.((line, idx) =>
                      React.createElement(
                        line.tag,
                        {
                          key: idx,
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
                <button className="delete-btn" onClick={() => handleDelete(item.id)}>
                  x
                </button>
              </div>
            </Rnd>
          ) : (
            <div
              key={item.id}
              style={{ position: 'absolute', left: item.x, top: item.y, width: item.width, height: item.height }}
            >
              {item.lines?.map?.((line, idx) =>
                React.createElement(
                  line.tag,
                  {
                    key: idx,
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
        )}
      </div>

      {user?.role === 'admin' && (
        <div className="toolbar">
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          <button onClick={handleAddText}>Thêm Text</button>
          <button className="save-btn" onClick={handleSave}>
            💾 Lưu Dữ Liệu
          </button>
        </div>
      )}
    </div>
  );
};

export default WorkDetail;
