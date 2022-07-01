import { Dropdown, Menu } from "antd";
import DeletedModal from "@/components/DeletedModal";
import { useModel } from "@@/plugin-model/useModel";

const BoardNode = ({
  node,
  onDelete,
}: {
  node: any;
  onDelete: (nodeIds: any[]) => Promise<any>;
}) => {
  const {
    setExtra,
    setIsEditNode,
    setCurrentNode,
    showNodeModal,
    updateBoardNode,
    doSetNodesAndFolders,
  } = useModel("dataAnalysis", (model) => ({
    setExtra: model.manageNode.setExtra,
    setIsEditNode: model.manageNode.setIsEditNode,
    setCurrentNode: model.manageNode.setCurrentNode,
    showNodeModal: model.manageNode.showNodeModal,
    updateBoardNode: model.manageNode.updateBoardNode,
    doSetNodesAndFolders: model.manageNode.doSetNodesAndFolders,
  }));
  const handleDelete = () => {
    DeletedModal({
      content: `确定删除节点: ${node.name} 吗？`,
      onOk: () =>
        onDelete([node.id]).then(() =>
          doSetNodesAndFolders({
            iid: node.iid,
            primary: node.primary,
            workflowId: node.workflowId,
          })
        ),
    });
  };

  const handleUpdateNode = () => {
    setExtra({
      id: node.id,
      iid: node.iid,
      folderId: node.folderId,
      primary: node.primary,
      secondary: node.secondary,
      tertiary: node.tertiary,
    });
    setIsEditNode(true);
    setCurrentNode(node);
    showNodeModal(updateBoardNode);
  };
  const menu = (
    <Menu
      items={[
        {
          onClick: handleUpdateNode,
          label: "修改节点",
          key: "updateNode",
        },
        {
          onClick: handleDelete,
          label: "删除节点",
          key: "delete-node",
        },
      ]}
    />
  );
  return (
    <Dropdown overlay={menu} trigger={["contextMenu"]}>
      <div>{node.name}</div>
    </Dropdown>
  );
};
export default BoardNode;
