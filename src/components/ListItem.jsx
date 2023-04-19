import React, { useState } from "react";
import { ArrowDownCircle, Plus, Trash } from "react-bootstrap-icons";
import { Button, Form } from "react-bootstrap";
import Collapse from "react-bootstrap/Collapse";

export default function ListItem(props) {
  const {
    val,
    path,
    handleAdd,
    handleDelte,
    handleRequiredChange,
    handleSelectChange,
    handleInputChange,
  } = props;

  const [open, setOpen] = useState(true);
  const [hover, setHover] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleKeyPress = (e) => {
    if (e.which == 13) setIsEditing(false);
  };

  return (
    <div
      className="py-2 border-bottom list"
      style={{ marginLeft: `${path.length * 20}px` }}
    >
      <div
        className="d-flex justify-content-between align-items-center"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div>
          {val.list.length ? (
            <ArrowDownCircle
              role="button"
              size={20}
              onClick={() => setOpen(!open)}
              style={{
                transform: !open ? "rotate(180deg)" : "rotate(0)",
                transition: "transform 0.2s",
              }}
            />
          ) : (
            <>&nbsp; &nbsp;&nbsp;</>
          )}
        </div>
        <div className="col mx-3">
          {isEditing ? (
            <Form.Group>
              <Form.Control
                type={val.type == "number" ? "number" : "text"}
                placeholder="Enter value"
                value={val.value}
                onChange={(e) => handleInputChange(path, e.target.value)}
                onKeyDown={handleKeyPress}
              />
            </Form.Group>
          ) : (
            <div onClick={() => setIsEditing(true)} role="button">
              {val.value != "" ? (
                <p className="mb-0">{val.value}</p>
              ) : (
                <p className="text-muted mb-0">
                  <i>placeholder</i>
                </p>
              )}
            </div>
          )}
        </div>
        <div className="me-3">
          <Form.Group>
            <Form.Select
              value={val.type}
              onChange={(e) => handleSelectChange(path, e.target.value)}
            >
              <option value="string">string</option>
              <option value="number">number</option>
              <option value="boolean">boolean</option>
              <option value="object">object</option>
            </Form.Select>
          </Form.Group>
        </div>
        <div
          className="d-flex align-items-center"
          style={{ opacity: hover ? 1 : 0 }}
        >
          <div className="mx-1">
            <Form.Group className="d-flex align-items-center">
              <Form.Label className="mb-0 me-1">Required</Form.Label>
              <Form.Switch
                role="button"
                defaultChecked={val.required}
                value={val.required}
                onChange={(e) => handleRequiredChange(path, e.target.checked)}
              />
            </Form.Group>
          </div>
          <div className="mx-1">
            <Button
              onClick={() => handleAdd(path)}
              size="sm"
              variant="outline-dark"
              disabled={val.type != "object"}
            >
              <Plus />
            </Button>
          </div>
          <div className="mx-1">
            <Button
              onClick={() => handleDelte(path)}
              size="sm"
              variant="outline-dark"
            >
              <Trash />
            </Button>
          </div>
        </div>
      </div>
      <Collapse in={open}>
        <div>
          {val.list.map((value, i) => (
            <ListItem
              val={value}
              path={[...path, "list", i]}
              handleAdd={handleAdd}
              handleDelte={handleDelte}
              handleRequiredChange={handleRequiredChange}
              handleSelectChange={handleSelectChange}
              handleInputChange={handleInputChange}
            />
          ))}
        </div>
      </Collapse>
    </div>
  );
}
