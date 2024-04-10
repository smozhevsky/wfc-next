"use client";

import styles from "./Main.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DraggingStyle,
  NotDraggingStyle,
} from "react-beautiful-dnd";
// import { sortItems } from "./../../store/weatherData/weatherData.actions";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { WeatherCard } from "./weather-card";
import { moveItems } from "@/redux/features/weatherData-slice";

export const MainContent = () => {
  const weatherData = useSelector(
    (state: RootState) => state.weatherDataReducer.panels
  );

  const dispatch = useDispatch<AppDispatch>();

  const handleOnDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    if (!destination || destination.index === source.index) {
      return;
    }

    dispatch(
      moveItems({
        sourceIndex: source.index,
        destinationIndex: destination.index,
      })
    );
  };

  const getItemStyle = ({
    transform,
    draggableStyle,
  }: {
    transform?: string;
    draggableStyle?: DraggingStyle | NotDraggingStyle;
  }) => {
    const styles = {
      ...draggableStyle,
    };
    if (!transform) {
      return styles;
    }
    return {
      ...styles,
      transform: `translate(0, ${transform.substring(
        transform.indexOf(",") + 1,
        transform.indexOf(")")
      )})`,
    };
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="main">
        {(provided) => (
          <main {...provided.droppableProps} ref={provided.innerRef}>
            <TransitionGroup className={styles.main}>
              {weatherData.map(
                ({ data, viewType, uniqueId, timezone }, index) => (
                  <CSSTransition
                    key={uniqueId}
                    timeout={300}
                    classNames={{
                      enter: styles.item_enter,
                      enterActive: styles.item_enter_active,
                      exit: styles.item_exit,
                      exitActive: styles.item_exit_active,
                    }}
                  >
                    <Draggable
                      key={uniqueId}
                      draggableId={uniqueId}
                      index={index}
                    >
                      {(provided, snapshot) => {
                        const transform =
                          provided.draggableProps.style?.transform;
                        const draggableStyle = provided.draggableProps.style;
                        const style = getItemStyle({
                          transform,
                          draggableStyle,
                        });

                        return (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={style}
                          >
                            <WeatherCard
                              data={data}
                              index={index}
                              viewType={viewType}
                              timezone={timezone}
                            />
                          </div>
                        );
                      }}
                    </Draggable>
                  </CSSTransition>
                )
              )}
              {provided.placeholder}
            </TransitionGroup>
          </main>
        )}
      </Droppable>
    </DragDropContext>
  );
};
