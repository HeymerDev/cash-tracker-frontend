const EditBudgetPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;

  return <div>EditBudgetPage {id}</div>;
};

export default EditBudgetPage;
