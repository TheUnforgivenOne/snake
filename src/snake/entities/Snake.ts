import { Position, Direction } from '../types';
import { positionByDirectionDictionary } from '../constants';

class Snake {
  private rows: number;
  private cols: number;
  private bodyPositions: Position[] = [];
  private direction: Direction = Direction.UP;

  constructor(rows: number, cols: number) {
    this.rows = rows;
    this.cols = cols;
    this.initializeSnake();
  }

  getDirection() {
    return this.direction;
  }

  setDirection(newDirection: Direction) {
    this.direction = newDirection;
  }

  getBodyPositions() {
    return this.bodyPositions;
  }

  addNewPosition(newPosition: Position) {
    this.bodyPositions.push(newPosition);
  }

  removeLastPosition() {
    return this.bodyPositions.shift();
  }

  // Place snake (length 3) vertically at the center of the board
  private initializeSnake() {
    const centerBoardPosition = {
      row: Math.floor(this.rows / 2),
      col: Math.floor(this.cols / 2),
    };

    [1, 0, -1].forEach((diff) => {
      this.bodyPositions.push({
        row: centerBoardPosition.row + diff,
        col: centerBoardPosition.col,
        rotation: 0,
      });
    });
  }

  // Handle snake exit out from the board
  private validateCoordinate(
    coordinate: number,
    coordinateType: 'col' | 'row',
  ) {
    const maxValue = coordinateType === 'col' ? this.cols : this.rows;

    if (coordinate < 0) return maxValue - 1;
    if (coordinate > maxValue - 1) return 0;
    return coordinate;
  }

  nextPosition() {
    const positionDiff = positionByDirectionDictionary[this.direction];
    const headPosition = this.bodyPositions[this.bodyPositions.length - 1];

    const newPosition: Position = {
      row: this.validateCoordinate(headPosition.row + positionDiff.row, 'row'),
      col: this.validateCoordinate(headPosition.col + positionDiff.col, 'col'),
      rotation: positionDiff.rotate,
    };

    return newPosition;
  }

  // Check if snake bites itself
  isIntercept(position: Position) {
    return this.bodyPositions.some(
      ({ row, col }) => row === position.row && col === position.col,
    );
  }
}

export default Snake;
