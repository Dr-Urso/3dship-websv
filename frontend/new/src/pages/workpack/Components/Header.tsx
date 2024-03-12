import React from 'react';
import './header.css';

export const Header: React.FC<{
  headerHeight: number;
  rowWidth: string;
  fontFamily: string;
  fontSize: string;
}> = ({ headerHeight, fontFamily, fontSize, rowWidth }) => {
  return (
    <div
      className={'ganttTable'}
      style={{
        fontFamily: fontFamily,
        fontSize: fontSize,
      }}
    >
      <div
        className={'ganttTable_Header'}
        style={{
          height: headerHeight - 2,
        }}
      >
        <div
          className={'ganttTable_HeaderItem'}
          style={{
            minWidth: rowWidth,
          }}
        >
          &nbsp;任务名
        </div>
        <div
          className={'ganttTable_HeaderSeparator'}
          style={{
            height: headerHeight * 0.5,
            marginTop: headerHeight * 0.2,
          }}
        />
        <div
          className={'ganttTable_HeaderItem'}
          style={{
            minWidth: rowWidth,
          }}
        >
          &nbsp;开始时间
        </div>
        <div
          className={'ganttTable_HeaderSeparator'}
          style={{
            height: headerHeight * 0.5,
            marginTop: headerHeight * 0.25,
          }}
        />
        <div
          className={'ganttTable_HeaderItem'}
          style={{
            minWidth: rowWidth,
          }}
        >
          &nbsp;结束时间
        </div>
      </div>
    </div>
  );
};
