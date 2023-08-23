using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using TMPro;
using Firebase;
using Firebase.Extensions;
using Firebase.Firestore;
using System.Linq;
using UnityEngine.SceneManagement;
using UnityEngine.Events;
using System.IO;
using System.Reflection;
using System;

public class ShowingAvailableDialog : MonoBehaviour
{
    private string username;
    public string NPCName;
    private FirebaseFirestore db;
    public int[] questValues;
    public Transform parentTransform;
    public Transform NextparentTransform;
    public GameObject PreviousDialog;
    public GameObject dialogUI;
    public GameObject Next;
    public TMP_Text NamaNPC;
    public TMP_Text dialogText;
    public Button buttonPrefab;
    public Button NextbuttonPrefab;
    public string Quest;
    public int condition;
    public UnityEvent Coba;
    // Start is called before the first frame update
    void Start()
    {
        LoadFromJson();
       if (FirebaseApp.DefaultInstance == null)
            {
                FirebaseApp.CheckAndFixDependenciesAsync().ContinueWithOnMainThread(task =>
                {
                    if (task.Exception != null)
                    {
                        Debug.LogError($"Firebase initialization failed: {task.Exception}");
                    }
                    else
                    {
                        InitializeFirestore();
                    }
                });
            }
            else
            {
                InitializeFirestore();
            } 
    }

    private void InitializeFirestore()
    {
        // Mendapatkan instance FirebaseFirestore
        db = FirebaseFirestore.DefaultInstance;

    }

    // Update is called once per frame
    public void FillText()
    {
    Debug.Log(username);
    DocumentReference docRef = db.Collection("UsersLog").Document(username);
        
        docRef.GetSnapshotAsync().ContinueWithOnMainThread(snapshotTask =>
        {
            if (snapshotTask.IsFaulted)
            {
                Debug.LogError("Error fetching document: " + snapshotTask.Exception);
                return;
            }

            DocumentSnapshot snapshot = snapshotTask.Result;

            if (snapshot.Exists)
            {
                IDictionary<string, object> userData = snapshot.ToDictionary();
                foreach (KeyValuePair<string, object> field in userData)
                {
                    if (field.Key.StartsWith("Quest") && field.Value is long questValue)
                    {
                        string nameValue = field.Key;
                        int Value = (int)questValue;
                        Debug.Log("INI NAMA QUESTNYA" + nameValue);
                        Debug.Log(Value);
                        if(Value !=-1 && Value !=99)
                        {
                            AssignIntVariable(Value,nameValue);
                        }
                    }
                }
            }
            else
            {
                Debug.Log("Document does not exist for username: " + username);
            }
        });
    }

    public void LoadFromJson()
    {
        string json = File.ReadAllText(Application.persistentDataPath+"/LogsPlayerDatas.json");
        SaveUsersLogDatas data = JsonUtility.FromJson<SaveUsersLogDatas>(json);

        username = data.username;
    }

    public void AssignIntVariable(int Values, string NameValue)
    {
        string namaquest = NameValue;
                // Define the collection reference
        CollectionReference dialogCollection = db.Collection("Quest");

        // Build the query
        Query query = dialogCollection.WhereEqualTo("NamaQuest", namaquest);

        query.GetSnapshotAsync().ContinueWithOnMainThread(queryTask =>
            {
                if (queryTask.IsCompleted && !queryTask.IsFaulted && !queryTask.IsCanceled)
                {
                    QuerySnapshot querySnapshot = queryTask.Result;

                    foreach (DocumentSnapshot documentSnapshot in querySnapshot.Documents)
                    {
                        if (documentSnapshot.Exists)
                        {
                            DocumentSnapshot ListData = querySnapshot.Documents.FirstOrDefault();
                            List<string> dialogList = ListData.GetValue<List<string>>("Goals");
                            //IntantiatePrefabs Quest Yang Tersedia.
                            Button instantiatedButton = Instantiate(buttonPrefab, parentTransform);
                            TextMeshProUGUI buttonText = instantiatedButton.GetComponentInChildren<TextMeshProUGUI>();
                            buttonText.text = dialogList[Values];
                            instantiatedButton.onClick.AddListener(() => OnButtonClicked(instantiatedButton,namaquest,Values,0));
                            // //IntantiatePrefabs Next Button Berdasarkan Quest Yang Dipilih.
                            // Button instantiatedButton2 = Instantiate(NextbuttonPrefab, NextparentTransform);
                            // TextMeshProUGUI buttonNextText = instantiatedButton2.GetComponentInChildren<TextMeshProUGUI>();
                            // buttonNextText.text = "Continue";
                            // instantiatedButton2.onClick.AddListener(() => NextButton(instantiatedButton2,namaquest,Values));
                            
                        }
                    }
                }
                else
                {
                    Debug.LogError("Error executing query: " + queryTask.Exception);
                }
            });
    }

    public void OnButtonClicked(Button clickedButton, string QuestName, int Condition, int index)
    {

        Debug.Log("Button clicked: " + clickedButton.GetComponentInChildren<TextMeshProUGUI>().text);
        PlayerPrefs.SetInt(QuestName, 0);
        //IntantiatePrefabs


        // Call your function here based on the clicked button's data
        string buttonText = clickedButton.GetComponentInChildren<TextMeshProUGUI>().text;
        CollectionReference dialogCollection = db.Collection("Dialog");

        // Build the query
        Query query = dialogCollection.WhereEqualTo("NPC", NPCName).WhereEqualTo("Quest", QuestName).WhereEqualTo("Condition", Condition);
        query.GetSnapshotAsync().ContinueWithOnMainThread(queryTask =>
            {
if (queryTask.IsCompleted && !queryTask.IsFaulted && !queryTask.IsCanceled)
{
    Debug.Log(NPCName);
    Debug.Log(QuestName);
    Debug.Log(Condition);
    QuerySnapshot querySnapshot = queryTask.Result;

    DocumentSnapshot documentSnapshot = querySnapshot.Documents.FirstOrDefault();

    if (documentSnapshot.Exists)
    {
        Debug.Log("I WAS HERE");
        string npcName = documentSnapshot.GetValue<string>("NPC");
        List<string> dialogList = documentSnapshot.GetValue<List<string>>("Massage");
        Debug.Log(dialogList[0]);

        if (dialogList != null && dialogList.Count > 0 && index < dialogList.Count)
        {
            ShowDialog(npcName, dialogList[index]);
        }
        else
        {
            CloseDialog();
        }
    }
    else
    {
        // Handle the case when no documents are found or documentSnapshot is null
    }
}
            });
    }

    private void ShowDialog(string npcName, string dialog)
    {
        Debug.Log("ShowingDialog");
        Coba.Invoke();
        NamaNPC.text = npcName;
        dialogText.text = dialog;
    }

    public void Continue(string Quest)
    {
        CollectionReference dialogCollection = db.Collection("Dialog");

        // Build the query
        Debug.Log(Quest);
        Query query = dialogCollection.WhereEqualTo("Quest", Quest);
        query.GetSnapshotAsync().ContinueWithOnMainThread(queryTask =>
    {
    if (queryTask.IsCompleted && !queryTask.IsFaulted && !queryTask.IsCanceled)
    {
        QuerySnapshot querySnapshot = queryTask.Result;

        foreach (DocumentSnapshot documentSnapshot in querySnapshot.Documents)
        {
            if (documentSnapshot.Exists)
            {
                List<string> dialogList = documentSnapshot.GetValue<List<string>>("Massage");
                string npcName = documentSnapshot.GetValue<string>("NPC");
                int Condition = documentSnapshot.GetValue<int>("Condition");
                int index = PlayerPrefs.GetInt(Quest);
                index++;

                    if (dialogList != null && dialogList.Count > 0 && index < dialogList.Count)
                    {
                        ShowDialog(npcName, dialogList[index]);
                        PlayerPrefs.SetInt(Quest,index);
                    }
                    else
                    {
                        PlayerPrefs.SetInt(Quest, 0);
                        CloseDialog();
                    }
                PlayerPrefs.SetInt(Quest, index);
            }
            else
            {
                Debug.LogWarning("Document does not exist.");
            }
        }
    }
    else
    {
        Debug.LogError("Error executing query: " + queryTask.Exception);
    }});
    }

    public void CloseDialog()
    {
        // ToggleScript();
        Next.SetActive(true);
        PreviousDialog.SetActive(false);
        dialogUI.SetActive(false);
        dialogText.text = "Selamat Datang Di RSUD Ponorogo, Ada Yang Bisa Dibantu ?";
    }
}


[System.Serializable]
public class SaveUsersLogDatas
{
    public string username;

}
