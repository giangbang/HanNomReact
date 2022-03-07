import React, { useState, useRef, useEffect, useCallback } from "react";
import { parse } from "json2csv";
import ImageAnnoDisplay from "./ImageAnnoDisplay";
import { FaEdit, FaTrash } from "react-icons/fa";

function ImageDetail({ image, drawBoxes, setDrawBoxes }) {
  const [boxes, setBoxes] = useState([]);

  const [editModes, setEditModes] = useState([]);
  const [scale, setScale] = useState(1);
  const [svgWidth, setSvgWidth] = useState(0);
  const [svgHeight, setSvgHeight] = useState(0);
  const [isAddBoundingBox, setIsAddBoundingBox] = React.useState(false);
  const [newListDrawing, setNewListDrawing] = useState([]);
  const [isEdit, setEdit] = useState(false);
  const [newLabel, setNewLabel] = useState(drawBoxes.label);
  const ref = useRef(null);

  useEffect(() => {
    if (typeof image === "undefined") return;
    if (ref.current && ref.current.offsetWidth < image.width) {
      setScale(ref.current.offsetWidth / image.width);
      setSvgWidth(ref.current.offsetWidth);
      setSvgHeight(scale * image.height);
    } else {
      setSvgWidth(image.width);
      setSvgHeight(image.height);
    }
    if (image.boxes) {
      setBoxes(image.boxes.sort((a, b) => a.id - b.id));
      setEditModes(Array(image.boxes.length).fill(false));
    }
  }, [image, scale]);


  const updateisAddBoundingBox = useCallback((isAddBoundingBox) => {
    setIsAddBoundingBox(isAddBoundingBox);
  }, []);

  const updateNewListDrawing = useCallback((newListDrawing) => {
    setNewListDrawing(newListDrawing);
  }, []);

  if (typeof image === "undefined") {
    return <div>Loading...</div>;
  }

  const updateListBox = (newListDrawing) => {
    newListDrawing.map((a, index) => {
      setBoxes([
        ...boxes,
        {
          id: "id" + new Date().getTime(),
          label: null,
          x_min: a.startX / scale,
          x_max: (a.startX + a.width) / scale,
          y_min: a.startY / scale,
          y_max: (a.startY + a.height) / scale,
        },
      ]);
    });
  };

  const onAddBoxButtonClick = () => {
    setIsAddBoundingBox(!isAddBoundingBox);
    updateListBox(newListDrawing);
  };

  const downloadBoxesAsCSV = () => {
    const fields = ["label", "x_min", "y_min", "x_max", "y_max"];

    const csv = `data:text/csvcharset=utf-8,${parse(boxes, { fields })}`;

    const hiddenElement = document.createElement("a");
    hiddenElement.setAttribute("href", encodeURI(csv));
    hiddenElement.setAttribute("target", "_blank");
    hiddenElement.setAttribute(
      "download",
      image.filename.replace("jpg", "csv")
    );
    hiddenElement.click();
  };

  const toggleEditMode = (e) => {
    setEdit(!isEdit);
  };

  const handleSave = (e) => {
    setEdit(!isEdit);
    const newBox = {
      id: drawBoxes.id,
      label: newLabel,
      x_min: drawBoxes.x_min,
      x_max: drawBoxes.x_max,
      y_min: drawBoxes.y_min,
      y_max: drawBoxes.y_max,
    };
    const foundIndex = boxes.findIndex((x) => x.id == newBox.id);
    console.log("Index in array", foundIndex);
    boxes[foundIndex] = newBox;
    setBoxes([...boxes]);
  };

  const handleTrashIconClick = (e) => {
    const arr = boxes.filter((item) => {
      return item.id !== drawBoxes.id;
    });
    setBoxes([...arr]);
    alert("Đã xóa");
  };

  const onLabelChange = (e) => {
    setNewLabel(e.target.value);
  };
  const renderEdit = () => {
    return (
      <div className="gray">
        {!isAddBoundingBox ? (
          <>
            <span className="box-label-first">Nhãn </span>
            <input
              type="text"
              id="label"
              key={drawBoxes.label}
              defaultValue={drawBoxes.label}
              disabled={!isEdit}
              style={{ fontSize: 20, width: "50px", height: "50px" }}
              onChange={onLabelChange}
            ></input>
            {console.log("Updated label: ", drawBoxes.label)}
            <button className="circular button" onClick={toggleEditMode}>
              <FaEdit />
            </button>
            <button className="circular button" onClick={handleTrashIconClick}>
              <FaTrash />
            </button>

            {isEdit ? (
              <button className="circular primary button" onClick={handleSave}>
                Lưu
              </button>
            ) : null}
          </>
        ) : null}
      </div>
    );
  };
  return (
    <div className="row space-around">
      <div className="half-width-item text-center" ref={ref}>
        <ImageAnnoDisplay
          svgWidth={svgWidth || 0}
          svgHeight={svgHeight || 0}
          imageWidth={image.width}
          imageHeight={image.height}
          scale={scale}
          boxes={boxes}
          drawBoxes={drawBoxes}
          setDrawBoxes={setDrawBoxes}
          filename={image.filename}
          isDrawing={isAddBoundingBox}
          updateNewListDrawing={updateNewListDrawing}
          imgId={image._id}
        />
        {/* {console.log("DrawBoxes_id", drawBoxes.id)}
        <button className="blue button" onClick={downloadBoxesAsCSV}>
          Tải xuống annotation
        </button> */}

        {/* {!isAddBoundingBox ? (
          <button className="blue button" onClick={onAddBoxButtonClick}>
            Thêm
          </button>
        ) : (
          <button
            className="circular primary button"
            onClick={onAddBoxButtonClick}
          >
            Lưu
          </button>
        )} */}

        {/* <br></br> */}
        {/* {renderEdit()} */}
      </div>
    </div>
  );
}

export default ImageDetail;
