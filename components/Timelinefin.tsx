import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Svg, { Line, Circle } from "react-native-svg";

const { width } = Dimensions.get("window");

const TimelineItem = ({ title, description, status, isCompleted, isLast }:any) => {
  return (
    <View style={styles.timelineItem}>
      {/* Timeline Indicator */}
      <View style={styles.indicator}>
        <Svg height="100" width="20">
          {/* Vertical Line */}
          {!isLast && (
            <Line
              x1="10"
              y1="20"
              x2="10"
              y2="100"
              stroke="#ccc"
              strokeWidth="2"
            />
          )}
          {/* Circle Indicator */}
          <Circle
            cx="10"
            cy="20"
            r="10"
            fill={isCompleted ? "#007AFF" : "#ccc"}
          />
          {/* Inner Circle */}
          {isCompleted && <Circle cx="10" cy="20" r="5" fill="#fff" />}
        </Svg>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <Text
          style={[
            styles.status,
            {
              color:
                status === "Completed"
                  ? "green"
                  : status === "Processing"
                  ? "cyan"
                  : "orange",
            },
          ]}
        >
          {status}
        </Text>
      </View>
    </View>
  );
};

const ExpenseTimeline = () => {
  const timelineData = [
    {
      title: "Title 1",
      description: "Description of the Process and any key points",
      status: "Completed",
      isCompleted: true,
    },
    {
      title: "Title 2",
      description: "Description of the Process and any key points",
      status: "Processing",
      isCompleted: false,
    },
    {
      title: "Title 3",
      description: "Description of the Process and any key points",
      status: "Pending",
      isCompleted: false,
    },
    {
      title: "Title 4",
      description: "Description of the Process and any key points",
      status: "Pending",
      isCompleted: false,
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Expense Timeline</Text>
      {timelineData.map((item, index) => (
        <TimelineItem
          key={index}
          title={item.title}
          description={item.description}
          status={item.status}
          isCompleted={item.isCompleted}
          isLast={index === timelineData.length - 1}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#94958B",
    marginLeft:10 , 
    marginRight:10 , 
    borderRadius:10 , 
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#fff",
  },
  timelineItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  indicator: {
    width: 40,
    alignItems: "center",
  },
  content: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: "#fff",
    marginBottom: 5,
  },
  status: {
    fontSize: 14,
    fontWeight: "600",
  },
});

export default ExpenseTimeline;
