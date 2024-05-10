# 동작 방식
- yarn install 후 yarn dev 명령어로 실행
- 첫 화면에서 CSV파일 업로드
  - key값은 메일로 보내주신
    - Id
    - category0
    - category1
    - category2
    - name
  - 위와 같은 key값 사용 (해당되는 key값이 안들어올 경우 정보 호출은 따로 안됨)
- 업로드 후 옵션 선택 및 Asset List 페이지 랜딩


# Test Case
- CSV파일 data 트리 형태 구조로 변경 되어지는 확인
- CSV 파일 업로드 후 Asset List 형식에 맞게 표시 확인
- 업로드 되어진 파일 -> Treeview 형태의 select 기능 구현
- 옵션 선택시 AssetList에 바로 반영되는지 확인
- 선택된 옵션 항목에도 반영되는지 확인
- 옵션 체크박스 선택 해제시 바로 반영되는 확인
- 선택된 옵션 x 클릭시 해제되는지 확인

 
# 완성 전 파트
- 하위 옵션이 하나라도 선택되면 상위 옵션 (-) 처리 되는 기능
- [선택된 옵션] tag 단일 하위 메뉴 추가되다가, 전체메뉴로 변경되는 기능
- 필터 검색기능
