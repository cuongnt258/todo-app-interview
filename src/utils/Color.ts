import Colors from "@constants/Colors";

const getPriorityColor = (priority?: number) => {
  switch (priority) {
    case 4:
      return Colors.red;

    case 3:
      return Colors.orange;

    case 2:
      return Colors.blue;

    case 1:
    default:
      return Colors.charcoal;
  }
};

const ColorUtils = { getPriorityColor };

export default ColorUtils;
