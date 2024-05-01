import React, { FC, ReactNode, createRef, useRef, useState } from "react";
import {
  BackHandler,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import DrawerLayout, {
  DrawerState,
} from "react-native-gesture-handler/DrawerLayout";
import Icon from "react-native-vector-icons/Feather";

import { useAppDispatch, useAppSelector } from "@store";

import Colors from "@constants/Colors";

import { Project } from "@models/Project";

import LocalizationService from "@services/Localization";

import { SettingActions } from "@store/slices/settingSlice";

import { refLoading } from "./common/Loading";
import ModalAction, { ModalActionHandle } from "./modal/ModalAction";

export const refDrawer = createRef<DrawerLayout>();

interface DrawerProps {
  children: ReactNode;
  navigation: any;
}

const Drawer: FC<DrawerProps> = ({ children, navigation }) => {
  const { translations } = LocalizationService || {};

  const dispatch = useAppDispatch();

  const { projects } = useAppSelector(({ setting }) => setting);

  const refIsOpen = useRef(false);
  const refBackHandler = useRef<any>(null);
  const refModalAction = useRef<ModalActionHandle>(null);

  const [selected, setSelected] = useState<Project | null>(null);
  const { id, name } = selected || {};

  const filteredProjects = projects.filter(
    (project: Project) => !project.inbox_project,
  );

  const projectLength = filteredProjects.length;

  const _setLoading = (isLoading: boolean = false) => {
    refLoading.current?.setLoading(isLoading);
  };

  const _removeHandler = () => {
    refBackHandler.current && refBackHandler.current.remove();
  };

  const _closeDrawer = () => {
    refDrawer.current?.closeDrawer();
  };

  const _onPressBack = () => {
    if (refIsOpen.current) _closeDrawer();
    else BackHandler.exitApp();
    return true;
  };

  const _onDrawerStateChanged = (_: DrawerState, drawerWillShow: boolean) => {
    _removeHandler();
    if (drawerWillShow) {
      refBackHandler.current = BackHandler.addEventListener(
        "hardwareBackPress",
        _onPressBack,
      );
    }
    refIsOpen.current = drawerWillShow;
  };

  const _onPressInbox = () => {
    _closeDrawer();
  };

  const _onPressProject = (item: Project) => {
    _closeDrawer();

    navigation.navigate("Project", { project: item });
  };

  const _onPressAddProject = () => {
    navigation.navigate("ProjectForm", {
      childOrder: (filteredProjects[projectLength - 1]?.child_order ?? -1) + 1,
    });
  };

  const _onDeleteProject = async () => {
    if (!id) return;
    _setLoading(true);
    await dispatch(SettingActions.deleteProject(id));
    _setLoading(false);
  };

  const _onEditProject = () => {
    if (!id) return;
    _closeDrawer();
    navigation.navigate("ProjectForm", {
      project: selected,
    });
  };

  const _onPressSetting = (item: Project) => {
    setSelected(item);
    refModalAction.current?.show();
  };

  const _renderInboxButton = () => {
    const isActive = true;

    return (
      <View style={styles.menuButtonContainer}>
        <TouchableOpacity
          style={[styles.menuButton, styles.inbox, isActive && styles.active]}
          onPress={_onPressInbox}
        >
          <View style={styles.iconWrapper}>
            <Icon name="inbox" size={16} color={Colors.white} />
          </View>
          <View style={styles.menuLabelWrapper}>
            <Text style={styles.menuLabel}>Inbox</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const _renderButton = (item: Project) => {
    const { name, id } = item || {};

    return (
      <View key={id} style={styles.menuButtonContainer}>
        <TouchableOpacity
          style={[styles.menuButton, styles.noSpace]}
          onPress={() => _onPressProject(item)}
        >
          <View style={styles.menuLabelWrapper}>
            <Text style={styles.menuLabel}>{name}</Text>
            <TouchableOpacity
              style={[styles.iconWrapper, styles.setting]}
              onPress={() => _onPressSetting(item)}
            >
              <Icon name="settings" size={16} color={Colors.grey} />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const _renderProjectButtons = () => {
    return filteredProjects.map(_renderButton);
  };

  function _renderDrawer() {
    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false} overScrollMode="never">
          {_renderInboxButton()}
          <View style={styles.horizontalDivider} />
          <View style={styles.projectContainer}>
            <Text style={styles.projects}>
              {translations.projects} {filteredProjects.length}/5
            </Text>
            {projectLength < 5 && (
              <TouchableOpacity
                style={styles.iconWrapper}
                onPress={_onPressAddProject}
              >
                <Icon name="plus" color={Colors.white} size={16} />
              </TouchableOpacity>
            )}
          </View>
          {_renderProjectButtons()}
        </ScrollView>

        <ModalAction
          ref={refModalAction}
          name={name}
          onDelete={_onDeleteProject}
          onEdit={_onEditProject}
        />
      </View>
    );
  }

  return (
    <DrawerLayout
      ref={refDrawer}
      drawerWidth={300}
      drawerPosition="left"
      drawerType="front"
      edgeWidth={54}
      renderNavigationView={_renderDrawer}
      useNativeAnimations={false}
      onDrawerStateChanged={_onDrawerStateChanged}
    >
      {children}
    </DrawerLayout>
  );
};

export default Drawer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingVertical: 12,
  },
  menuButtonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  menuButton: {
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2,
    borderRadius: 4,
    flex: 1,
  },
  noSpace: {
    paddingLeft: 0,
  },
  active: {
    backgroundColor: Colors.grape + "50",
  },
  menuLabelWrapper: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  menuLabel: {
    fontSize: 15,
    color: Colors.black,
    justifyContent: "center",
  },
  iconWrapper: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.grape,
    borderRadius: 12,
    marginRight: 12,
  },
  horizontalDivider: {
    height: 1,
    width: "100%",
    backgroundColor: Colors.grey,
    marginTop: 16,
  },
  projectContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",
    paddingVertical: 8,
  },
  projects: {
    flex: 1,
    fontSize: 12,
    color: Colors.charcoal,
    lineHeight: 25,
    marginLeft: 14,
    textTransform: "uppercase",
  },
  setting: {
    marginRight: 0,
    backgroundColor: Colors.white,
  },
  inbox: {
    paddingHorizontal: 12,
  },
});
