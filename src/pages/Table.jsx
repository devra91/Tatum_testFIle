import {useState} from 'react';
import TreeViewSelect from '../components/treeView/TreeViewSelect';
import DataTable from '../components/dataTable/DataTable';

const Table = (x) => {
  let data = x.csvArray;
  const [selectedItems, setSelectedItems] = useState([]);
  const [checked, setChecked] = useState({});

  /**
   * 선택 항목 추가
   * @param {object} item
   * @param {boolean} isChecked
   */
  const selectItem = (item, isChecked) => {
    setSelectedItems((prev) => {
      const itemIndex = prev.findIndex((x) => x.Id === item.Id);
      if (itemIndex >= 0) {
        // 기존에 선택 되어진 값이면 삭제
        return prev.filter((x) => x.Id !== item.Id);
      } else {
        // 기존에 선택되어지지 않았던 값이면 추가
        return [...prev, item];
      }
    });
    singleCheckToggle(item, isChecked);
  };

  /**
   * Id를 사용해서 체크 여부 판단 (한개)
   * @param {object} item
   * @param {boolean} isChecked
   */
  const singleCheckToggle = (item, isChecked) => {
    setChecked((prev) => ({
      ...prev,
      [item.Id]: isChecked,
    }));
    updateParentFromChild(item, isChecked);
  };

  /**
   * child만 수정했을때 Parent 수정 여부 판단
   * @param {object} item
   * @param {boolean} isChecked
   * to-be
   * 중간 Parent checkbox 수정 기능 추가 필요, checkBox에 보이는 표시랑 실제로 select되어진 항목이 다르게 보이는 이슈
   */
  const updateParentFromChild = (item, isChecked) => {
    if (item.category0 in checked) {
      setChecked((prev) => ({
        ...prev,
        [item.category0]: isChecked,
      }));
    } else if (item.category0 + '.' + item.category1 in checked) {
      setChecked((prev) => ({
        ...prev,
        [item.category0 + '.' + item.category1]: isChecked,
      }));
    } else if (item.category0 + '.' + item.category1 + '.' + item.category2 in checked) {
      setChecked((prev) => ({
        ...prev,
        [item.category0 + '.' + item.category1 + '.' + item.category2]: isChecked,
      }));
    }
  };

  /**
   * 체크박스 전체선택 & 중간선택
   * @param {object} item
   * @param {string} newPath
   * @param {boolean} isChecked
   */
  const updateBothParentAndChild = (item, newPath, isChecked) => {
    const checkVal = data.filter((x) => item.includes(x.Id));
    //child state 우선 변경
    checkVal.forEach((x) => {
      setChecked((prev) => ({
        ...prev,
        [x.Id]: isChecked,
      }));
    });

    //추후 indeterminate checkbox 추가 개발
    const parentId = findParentId(newPath);
    if (parentId) {
      setChecked((prev) => ({
        ...prev,
        [newPath]: isChecked,
      }));
    } else {
      setChecked((prev) => ({
        ...prev,
        [newPath]: isChecked,
      }));
    }
  };

  //기존 checked에 존재 하는지 판단
  const findParentId = (x) => {
    if (x in checked) {
      return true;
    } else {
      return false;
    }
  };

  /**
   * 체크박스 전체선택
   * @param {object} item
   * @param {string} newPath
   * @param {boolean} isChecked
   */
  const selectALL = (item, newPath, isChecked) => {
    //Id를 사용해서 해당되는 값 호출
    const checkVal = data.filter((x) => item.includes(x.Id));
    setSelectedItems((prev) => {
      //해당 아이템 해당 유무 판단
      const itemIncl = selectedItems.filter((x) => item.includes(x.Id));
      if (itemIncl.length > 0) {
        const removeItems = prev.filter((x) => !checkVal.some((doc) => doc.Id === x.Id));
        return removeItems;
      } else {
        return [...prev, ...checkVal];
      }
    });
    updateBothParentAndChild(item, newPath, isChecked);
  };

  return (
    <div className="main-container">
      <div className="tree-select">
        <TreeViewSelect
          data={data}
          selectItem={selectItem}
          selectALL={selectALL}
          checked={checked}
          selectedItems={selectedItems}
        />
      </div>
      <div className="table-container">
        <DataTable selectedItems={selectedItems} data={data} />
      </div>
    </div>
  );
};

export default Table;
