/* eslint-disable react/prop-types */
import {useEffect, useState} from 'react';
import './TreeView.css';

// CSV파일 트리뷰 형태로 데이터 변경
const renderData = (list) => {
  let renderedData = {};
  list.forEach((item) => {
    if (!renderedData[item.category0]) {
      renderedData[item.category0] = {children: {}, childrenIDs: []};
    }
    renderedData[item.category0].childrenIDs.push(item.Id);
    if (!renderedData[item.category0].children[item.category1]) {
      renderedData[item.category0].children[item.category1] = {
        children: {},
        items: [],
        childrenIDs: [],
      };
    }
    renderedData[item.category0].children[item.category1].childrenIDs.push(item.Id);
    if (item.category2) {
      if (!renderedData[item.category0].children[item.category1].children[item.category2]) {
        renderedData[item.category0].children[item.category1].children[item.category2] = {
          items: [],
        };
      }
      renderedData[item.category0].children[item.category1].children[item.category2].items.push(item);
    } else {
      renderedData[item.category0].children[item.category1].items.push(item);
    }
  });
  return renderedData;
};

const TreeViewSelect = ({data, selectItem, selectALL, checked, selectedItems}) => {
  const [treeData, setTreeData] = useState({});
  const [expanded, setExpanded] = useState({});

  // onClick tab open/close
  const toggleExpand = (path) => {
    setExpanded((exp) => ({...exp, [path]: !exp[path]}));
  };

  // onChange click checkbox
  const selectCheckBox = (childrenIDs, newPath, isChecked) => {
    selectALL(childrenIDs, newPath, isChecked);
  };

  /**
   * select기능 구현
   * @param {object} node
   * @param {string} path
   */
  const renderTreeData = (node, path = '') => {
    return Object.keys(node).map((key) => {
      const newPath = path ? `${path}.${key}` : key;
      const isExpanded = !!expanded[newPath];
      const hasChildren = node[key].children && Object.keys(node[key].children).length > 0;
      const childrenIDs = node[key].childrenIDs ? node[key].childrenIDs : node[key].items.map((item) => item.Id);
      return (
        <div key={newPath}>
          <div className="expand-style">
            <div onClick={() => toggleExpand(newPath)}>{isExpanded ? '▼' : '►'}</div>
            <input
              type="checkbox"
              checked={checked[newPath]}
              onChange={() => selectCheckBox(childrenIDs, newPath, !checked[newPath])}
            />
            <div>
              {key} ({childrenIDs.length})
            </div>
          </div>
          {isExpanded && hasChildren && <ul>{renderTreeData(node[key].children, newPath)}</ul>}
          {isExpanded && node[key].items && (
            <div>
              {node[key].items.map((item) => (
                <div key={item.Id}>
                  <input
                    type="checkbox"
                    name={item.name}
                    checked={checked[item.Id]}
                    onChange={() => selectItem(item, !checked[item.Id])}
                  />
                  {item.name}
                </div>
              ))}
            </div>
          )}
        </div>
      );
    });
  };

  const selectedItemList = (x) => {
    if (x.length > 0) {
      return (
        <div>
          {x.map((item) => {
            return (
              <div key={item.Id}>
                <div className="selected-item">
                  <span>
                    {item.category0} &gt; {item.category1} &gt; {item.category2} : {item.name}
                  </span>
                  <span onClick={() => selectItem(item, !checked[item.Id])} style={{fontWeight: '600', color: 'red'}}>
                    x
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      );
    }
  };

  useEffect(() => {
    setTreeData(renderData(data));
  }, [data]);

  return (
    <div>
      <div style={{margin: '4px 0', color: '#2e2e2e', textAlign: 'left', fontWeight: '600'}}>옵션을 선택하세요</div>
      <div className="tree-view-container">{renderTreeData(treeData)}</div>
      <div className="select-item-container">
        <div className="select-item-title">선택된 옵션</div>
        <div>
          {selectedItems.length} / {data.length} selected
        </div>
        <div>{selectedItemList(selectedItems)}</div>
      </div>
    </div>
  );
};

export default TreeViewSelect;
