import styled from 'styled-components'
import { userTheme } from '@/styles/globals/userTheme'

export const Styles = styled.div`
  padding: 1rem;
  display: inline-block;
  max-width: 100%;
  overflow: hidden;
  margin-left: 50%;
  transform: translateX(-50%);
  font-weight: 600;

  .table {
    border-spacing: 0;
    width: 100%;
    border: 1px solid ${userTheme.tables.borders.gray};
    overflow: auto !important;
    max-width: 1600px;

    .tr {
      :last-child {
        .td {
          border-bottom: 0;
        }
      }
    }

    .th,
    .td {
      padding: 15px;
      border-top: 1.5px solid ${userTheme.tables.backgrounds.gray};
      overflow: hidden;

      :nth-last-child(2),
      :last-child {
        border-right: 0;
      }
    }
    .th .icon {
      position: absolute;
      margin-left: 10px;
      margin-top: 2px;

      &.sorted {
        margin-top: -2px;
        margin-left: 5px;
      }
    }

    .header {
      background-color: ${userTheme.tables.backgrounds.gray};
    }

    .footer {
      padding: 20px;
      border-top: 1px solid #ddd;
      text-align: center;

      span {
        color: ${userTheme.buttons.backgrounds.blue};
        cursor: pointer;
        padding-left: 15px;
      }
    }

    &.sticky {
      overflow: scroll;
      .header {
        position: sticky;
        z-index: 1;
        width: fit-content;
      }

      .header {
        z-index: 4;
        top: 0;
      }

      [data-sticky-td] {
        position: sticky;
      }

      [data-sticky-last-left-td] {
        border-right: 1px solid #ddd;
      }

      [data-sticky-first-right-td] {
        border-left: 1px solid #ddd;
        box-shadow: -10px 0 10px 0 rgba(0, 0, 0, 0.05);
      }
    }
  }
`
